"use client";

import { refresh } from "@/app/inventory/[productId]/actions";
import Card from "@/components/common/Card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useHTTP from "@/hooks/httpRequest";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { inventoryActions } from "@/store/inventotySlice";
import { AddRounded, DeleteRounded, EditRounded } from "@mui/icons-material";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

function Info({ product, loading = false }) {
  const { data, sendRequest } = useHTTP({
    updated: {},
  });
  const [info, setInfo] = useState<{
    name: string;
    categoryId: string;
    availability: boolean;
    categoryName?: string;
    createCategory?: boolean;
  }>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { exactCategories } = useAppSelector((s) => s.inventory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    product &&
      setInfo({
        name: product.name,
        categoryId: product?.category?.id || "",
        availability: product.availability,
      });
  }, [product, modalOpen]);

  const editHandler = () => {
    const body = {
      name: info.name,
      availability: info.availability,
    };

    if (info.categoryId == "new") {
      body["categoryName"] = info.categoryName;
      body["createCategory"] = true;
    } else if (info.categoryId) {
      body["categoryId"] = info.categoryId;
    }
    sendRequest(`admin/product/${product?.id}/info`, {
      dataIdentifier: "updated",
      method: "PUT",
      protected: true,
      body,
      action: (product) => {
        info.categoryId == "new" && dispatch(inventoryActions.refresh());
        refresh(product.id);
        setModalOpen(false);
      },
    });
    console.log(JSON.stringify(info));
  };
  return (
    <Card loading={loading}>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold">Product Info</h2>
          <div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setModalOpen(true)}
            >
              <EditRounded fontSize="small" />
            </Button>
          </div>
        </div>
        {product && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p>Name</p>
              <p>{product.name}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Category</p>
              <p>{product.category?.name || "Others"}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Available</p>
              <p>{product.availability ? "Yes" : "No"}</p>
            </div>
          </div>
        )}
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Info</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 grid-flow-row gap-4 items-center">
            <Label className="text-right">Name</Label>
            <Input
              placeholder="Product Name"
              value={info?.name}
              onChange={(e) => setInfo((s) => ({ ...s, name: e.target.value }))}
              className="col-span-3"
            />
            <Label className="text-right">Category</Label>
            <Select
              value={info?.categoryId}
              onValueChange={(value) =>
                setInfo((s) => ({ ...s, categoryId: value }))
              }
            >
              <div className="col-span-3 flex gap-1">
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                {info?.categoryId && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={() => setInfo((s) => ({ ...s, categoryId: "" }))}
                  >
                    <DeleteRounded fontSize="small" color="warning" />
                  </Button>
                )}
              </div>
              <SelectContent>
                <SelectItem value="new">
                  <div className="flex gap-1 items-center">
                    <AddRounded fontSize="small" /> New Category
                  </div>
                </SelectItem>
                {exactCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {info?.categoryId == "new" && (
              <>
                <Label className="text-right">Name</Label>
                <Input
                  className="col-span-3"
                  placeholder="Category Name"
                  value={info?.categoryName || ""}
                  onChange={(e) =>
                    setInfo((s) => ({ ...s, categoryName: e.target.value }))
                  }
                />
              </>
            )}
            <Label className="text-right">Available</Label>
            <ToggleGroup
              type="single"
              variant="outline"
              value={info?.availability ? "true" : "false"}
              onValueChange={(value) =>
                setInfo((s) => ({
                  ...s,
                  availability: value == "true" ? true : false,
                }))
              }
            >
              <ToggleGroupItem value="true">Yes</ToggleGroupItem>
              <ToggleGroupItem value="false">No</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <DialogFooter>
            <Button
              disabled={data.updated.isLoading}
              onClick={() => editHandler()}
            >
              {data.updated.isLoading && <ReloadIcon className="spin mr-2" />}
              <p>Save</p>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default Info;
