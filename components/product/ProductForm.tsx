import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useHTTP from "@/hooks/httpRequest";
import { AddRounded } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { useRouter } from "next/navigation";
import { inventoryActions } from "@/store/inventotySlice";

function ProductForm({ open = false, onOpenChange }) {
  const { data, sendRequest } = useHTTP({
    product: null,
  });
  const [catValue, setCatValue] = useState(null);
  const productRef = useRef<any>();
  const catRef = useRef<any>();
  const { categories } = useAppSelector((s) => s.inventory);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const body = {
      name: productRef.current.value,
    };

    if (catValue == "new") {
      body["categoryName"] = catRef.current.value;
      body["createCategory"] = true;
    } else body["categoryId"] = catValue;

    sendRequest("admin/product", {
      method: "POST",
      dataIdentifier: "product",
      body,
      protected: true,
      action: (data) => {
        onOpenChange(false);
        catValue == "new" && dispatch(inventoryActions.refresh());
        router.push(`inventory/${data.id}`);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setCatValue(null);
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name</Label>
            <Input className="col-span-3" required ref={productRef} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Category</Label>
            <Select
              onValueChange={(value) => setCatValue(value)}
              value={catValue}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">
                  <div className="flex items-center gap-1">
                    <AddRounded fontSize="small" /> New Category
                  </div>
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {catValue == "new" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Title</Label>
              <Input className="col-span-3" required ref={catRef} />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
            type="submit"
            disabled={data.product.isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit()}
            disabled={data.product.isLoading}
          >
            {data.product.isLoading && (
              <ReloadIcon fontSize="small" className="animate-spin mr-2" />
            )}
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProductForm;
