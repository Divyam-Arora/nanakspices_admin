import { CurrencyRupeeRounded } from "@mui/icons-material";
import React from "react";

function Type({ type }) {
  return (
    <div
      className="flex flex-col gap-2 rounded-lg border border-slate-200 p-4 h-full"
      key={type.id}
    >
      <div className="flex justify-between">
        <p className="font-medium">Unit</p>
        <div className="flex flex-col items-end">
          <p>{type.unit.name}</p>
          <p className="subtle-text">{type.unit.description}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="font-medium">Price</p>
        <div className="flex items-center">
          <CurrencyRupeeRounded fontSize="small" color="action" />
          <p>{type.price}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="font-medium">Stock</p>
        <p>{type.stock}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-medium">Available</p>
        <p>{type.availability ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default Type;
