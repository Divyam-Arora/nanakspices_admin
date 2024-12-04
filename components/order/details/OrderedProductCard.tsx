import ImageBox from "@/components/product/ImageBox";
import { CurrencyRupeeRounded } from "@mui/icons-material";
import React from "react";

function OrderedProductCard({ productType }) {
  return (
    <div className="flex flex-col p-4 gap-4 border border-slate-200 rounded-lg">
      <div className="flex gap-4 flex-grow">
        <div className="w-1/3">
          <ImageBox image={productType.product.ProductImage?.[0]} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{productType.product.name}</p>
          <div>
            {/* <div className="flex gap-1"> */}
            <p>{productType.unit.name}</p>
            <p>({productType.unit.description})</p>
            {/* </div> */}
          </div>
          <p className="flex items-center">
            <CurrencyRupeeRounded color="action" fontSize="small" />
            {productType.price}
          </p>
          {/* <p>{productType.stock}</p> */}
        </div>
      </div>
      <div className="flex justify-around pt-4 border-t-[1px]">
        <p>Quantity: {productType.quantity}</p>
        <p className="flex items-center">
          Total Price: <CurrencyRupeeRounded color="action" fontSize="small" />
          {productType.price * productType.quantity}
        </p>
      </div>
    </div>
  );
}

export default OrderedProductCard;
