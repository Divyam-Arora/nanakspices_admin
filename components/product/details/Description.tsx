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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useHTTP from "@/hooks/httpRequest";
import { EditRounded } from "@mui/icons-material";
import { ReloadIcon } from "@radix-ui/react-icons";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Description({ product, loading = false, action = () => {} }) {
  const { data, sendRequest } = useHTTP({
    updated: {},
  });
  const [text, setText] = useState<string>(product?.description);
  const [modalOpen, setModalOpen] = useState(false);
  const path = usePathname();
  // console.log(path);

  useEffect(() => {
    product?.description && setText(product?.description);
  }, [product?.description]);

  const editHandler = () => {
    product?.description != text.trim() &&
      sendRequest(`admin/product/${product?.id}/description`, {
        dataIdentifier: "updated",
        method: "PUT",
        protected: true,
        body: { description: text },
        action: (product) => {
          refresh(product.id);
          setModalOpen(false);
        },
      });
  };

  return (
    <Card loading={loading}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold">Description</h2>
        {product?.description && (
          <div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setModalOpen(true)}
            >
              <EditRounded fontSize="small" />
            </Button>
          </div>
        )}
      </div>
      {!product?.description && (
        <div className="flex justify-center p-4">
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Add Product Description
          </Button>
        </div>
      )}
      {product?.description && (
        <div className="max-h-60 overflow-y-auto">
          <p className="whitespace-pre-wrap">{product.description}</p>
        </div>
      )}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Description</DialogTitle>
          </DialogHeader>

          <Textarea
            placeholder="Add product description"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ minHeight: "10rem", maxHeight: "20rem" }}
          />
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

export default Description;
