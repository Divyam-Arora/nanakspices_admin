import { CurrencyRupeeRounded } from "@mui/icons-material";
import clsx from "clsx";
import React from "react";

function OrderItem({ order }) {
  console.log(order);
  return (
    <div
      className={clsx([
        "flex flex-col gap-2 rounded-lg border border-x-4 border-y-0 border-slate-200 p-4 h-full",
        {
          [order?.status?.toLowerCase()]: true,
        },
      ])}
    >
      <div className="flex justify-between items-center gap-2">
        <p className="font-medium">Customer</p>
        <p>{order.user.name}</p>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="font-medium">Items</p>
        <p>{order.items || 0}</p>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="font-medium">Amount</p>
        <div className="flex items-center">
          <CurrencyRupeeRounded fontSize="small" color="action" />
          <p>{order.price}</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="font-medium">Placed on</p>
        <p>{new Date(order.createdAt).toDateString()}</p>
      </div>
      {order.paymentOn && (
        <div className="flex justify-between items-center gap-2">
          <p className="font-medium">Paid</p>
          <p>{new Date(order.paymentOn).toDateString()}</p>
        </div>
      )}
    </div>
  );
}

export default OrderItem;
