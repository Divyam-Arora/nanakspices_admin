import { refresh } from "@/app/inventory/[productId]/actions";
import { Button } from "@/components/ui/button";
import useHTTP from "@/hooks/httpRequest";
import { AddRounded } from "@mui/icons-material";
import { TokensIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React, { useRef, useState } from "react";

function AddImage({
  productId,
  size = "sm",
}: {
  productId: string;
  size?: "sm" | "lg";
}) {
  const inputRef = useRef<any>();
  const { sendRequest } = useHTTP({ images: [] });
  const [isLoading, setIsLoading] = useState(false);

  const handleFiles = async (files: FileList) => {
    setIsLoading(true);
    const uploads = await Promise.allSettled(
      Array.from(files).map((file) => uploadImage(file))
    );
    const responses = [];
    for (let res of uploads) {
      if (res.status == "fulfilled") {
        const data = await res.value.json();
        responses.push({
          url: data["secure_url"],
          publicId: data["public_id"],
        });
      }
    }

    sendRequest(`/admin/product/${productId}/image`, {
      protected: true,
      dataIdentifier: "images",
      method: "POST",
      body: { images: responses },
      action: (data) => {
        refresh(productId);
        setIsLoading(false);
        inputRef.current.value = "";
      },
    });
  };

  const uploadImage = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "admin_app");
    const cloudName = "dbfmqcjii";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    return fetch(url, {
      method: "POST",
      body: data,
    });
  };

  return (
    <div
      className={clsx([
        { "h-full w-full flex items-center justify-center": size == "lg" },
      ])}
      onClick={() => !isLoading && inputRef.current.click()}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        hidden
        ref={inputRef}
        onChange={(e) => handleFiles(e.currentTarget.files)}
      />
      {size == "sm" && (
        <Button variant="outline" size="icon" disabled={isLoading}>
          {isLoading ? <TokensIcon className="animate-spin" /> : <AddRounded />}
        </Button>
      )}
      {size == "lg" &&
        (isLoading ? (
          <TokensIcon className="animate-spin" />
        ) : (
          <AddRounded fontSize="large" color="action" />
        ))}
    </div>
  );
}

export default AddImage;
