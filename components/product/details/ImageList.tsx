"use client";

import Card from "@/components/common/Card";
import { Button } from "@/components/ui/button";
import { AddRounded, EditRounded } from "@mui/icons-material";
import React from "react";
import ImageOrderEditor from "./ImageOrderEditor";
import AddImage from "./AddImage";

function ImageList({ list, productId, loading = false }) {
  return (
    <Card loading={loading}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">Product Images</h2>
        {!!list.length && (
          <div>
            <ImageOrderEditor images={list} productId={productId}>
              <Button size="icon" variant="ghost">
                <EditRounded fontSize="small" />
              </Button>
            </ImageOrderEditor>
          </div>
        )}
      </div>
      <div className="flex gap-2 overflow-y-auto">
        {list.map((item) => (
          <div
            key={item.id}
            className="h-48 w-48 shrink-0 bg-primary-foreground p-2 rounded-lg"
          >
            <img src={item.url} className="w-full h-full object-contain" />
          </div>
        ))}
        {list.length == 0 && (
          <div className="h-48 w-48 flex items-center justify-center rounded-lg bg-primary-foreground cursor-pointer">
            {/* <AddRounded fontSize="large" color="action" /> */}
            <AddImage productId={productId} size="lg" />
          </div>
        )}
      </div>
    </Card>
  );
}

export default ImageList;
