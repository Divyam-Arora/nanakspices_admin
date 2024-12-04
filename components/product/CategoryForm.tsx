import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useHTTP from "@/hooks/httpRequest";
import { RefreshRounded } from "@mui/icons-material";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAppDispatch } from "@/hooks/storeHooks";
import { inventoryActions } from "@/store/inventotySlice";

function CategoryForm({ open = false, onOpenChange }) {
  const { data, sendRequest } = useHTTP({
    categories: [],
  });
  const inputRef = useRef<any>();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const title = inputRef.current.value;
    if (!title) return false;

    sendRequest(`/admin/category`, {
      method: "POST",
      dataIdentifier: "categories",
      protected: true,
      body: { name: title },
      action: (data) => {
        dispatch(inventoryActions.refresh());
        onOpenChange(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 items-center py-4">
          <Label>Title</Label>
          <Input ref={inputRef} />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            type="submit"
            disabled={data.categories.isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit()}
            disabled={data.categories.isLoading}
          >
            {data.categories.isLoading && (
              <ReloadIcon fontSize="small" className="animate-spin mr-2" />
            )}
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryForm;
