import React from "react";

const ImageBox = ({ image }) => {
  return (
    <div className="w-full h-full p-2 bg-primary-foreground rounded-lg">
      {image?.url && (
        <img
          src={image?.url}
          className="h-full w-full object-contain"
          alt={"product"}
        />
      )}
    </div>
  );
};

export default ImageBox;
