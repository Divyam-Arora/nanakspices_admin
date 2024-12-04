import { CurrencyRupeeRounded } from "@mui/icons-material";
import React from "react";
import ImageBox from "./ImageBox";

function ProductItem({ product }) {
  return (
    <div className="flex gap-4 p-4 bg-background rounded-lg h-full">
      <div className="w-1/3">
        <ImageBox image={product.ProductImage?.[0]} />
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        <div>
          <p className="font-bold">{product.name}</p>
          <p>{product.availability ? "Available" : "Not Available"}</p>
          {/* <p></p> */}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {product.productType.map((type) => (
            <div
              key={type.unit.id + product.id}
              className="flex flex-col items-center justify-center p-2 rounded border border-secondary gap-1"
            >
              <p className="font-medium">{type.unit.name}</p>
              <p className="flex items-center">
                <CurrencyRupeeRounded fontSize="small" color="action" />
                {type.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
