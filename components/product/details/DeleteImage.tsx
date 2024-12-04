import { refresh } from "@/app/inventory/[productId]/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useHTTP from "@/hooks/httpRequest";
import { Refresh } from "@mui/icons-material";
import { TokensIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

function DeleteImage({
  children,
  productId,
  image,
}: {
  children;
  productId: string;
  image: any;
}) {
  const [open, setOpen] = useState(false);
  const { sendRequest, isSending } = useHTTP();

  const deleteHandler = () => {
    sendRequest(`/admin/product/${productId}/image/${image.id}`, {
      protected: true,
      method: "DELETE",
      action: () => {
        refresh(productId);
        setOpen(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete image?</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="h-48 w-48 bg-primary-foreground rounded-lg overflow-hidden">
            <img src={image.url} className="w-full h-full object-contain" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => deleteHandler()} disabled={isSending}>
            {isSending && <TokensIcon className="mr-2 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteImage;
