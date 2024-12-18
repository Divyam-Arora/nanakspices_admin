"use client";

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
import { changePosition } from "@/lib/utils";
import {
  AddRounded,
  ArrowBackIosNewRounded,
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  DeleteRounded,
} from "@mui/icons-material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import AddImage from "./AddImage";
import { refresh } from "@/app/inventory/[productId]/actions";
import DeleteImage from "./DeleteImage";

function ImageOrderEditor({
  children,
  images,
  productId,
}: {
  children;
  productId;
  images: any[];
}) {
  const [listMap, setListMap] = useState({});
  const [ordered, setOrdered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const { sendRequest } = useHTTP();

  useEffect(() => {
    const map = {};
    const list = [];
    images.forEach((img) => {
      map[img.id] = img;
      list.push(img.id);
    });
    setListMap({ ...map });
    setOrdered([...list]);
  }, [images]);

  const changePositionHandler = (direction: 1 | -1) => {
    setOrdered((list) => changePosition(list, selected, direction));
  };

  const sendImagePositions = () => {
    sendRequest(`/admin/product/${productId}/image`, {
      protected: true,
      body: { position: ordered },
      method: "PUT",
      action: (data) => {
        refresh(productId);
        setSelected(null);
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95%] max-w-[50rem] flex flex-col overflow-hidden max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Images</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 overflow-y-auto h-auto">
          {ordered.map((id) => (
            <div
              key={id}
              className={clsx([
                "aspect-square rounded-lg p-2 transition cursor-pointer",
                {
                  "border border-primary": selected == id,
                  "opacity-50": listMap[selected] && selected != id,
                },
              ])}
              onClick={() => setSelected((s) => (s == id ? null : id))}
            >
              <img
                src={listMap[id].url}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <div className="grid grid-cols-3 w-full items-center">
            <div className="flex gap-2 justify-self-start">
              <AddImage productId={productId} />
              {selected && listMap[selected] && (
                <DeleteImage productId={productId} image={listMap[selected]}>
                  <Button variant="outline" size="icon">
                    <DeleteRounded color="warning" />
                  </Button>
                </DeleteImage>
              )}
            </div>
            <div className="flex gap-2 justify-self-center">
              {selected && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => changePositionHandler(-1)}
                  >
                    <ArrowBackIosNewRounded fontSize="small" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => changePositionHandler(1)}
                  >
                    <ArrowForwardIosRounded fontSize="small" />
                  </Button>
                </>
              )}

              {!selected && <p>Select an image</p>}
            </div>
            <div className="justify-self-end">
              <Button onClick={() => sendImagePositions()}>Save</Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ImageOrderEditor;
