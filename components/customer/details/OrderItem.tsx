import Card from "@/components/common/Card";
import { CurrencyRupeeRounded } from "@mui/icons-material";
import clsx from "clsx";
import React from "react";

const OrderItem = ({ order }: { order: any }) => {
  console.log(order);
  return (
    <Card
      className={clsx([
        "border-y-0 border-x-4 h-full",
        {
          [order?.status?.toLowerCase()]: true,
        },
      ])}
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-between">
          <p className="font-medium">Products</p>
          <p>{order.products || order?._count?.OrderedProducts || 0}</p>
        </div>
        <div className="flex gap-2 justify-between">
          <p className="font-medium">Items</p>
          <p>{order.items || 0}</p>
        </div>
        <div className="flex gap-2 justify-between">
          <p className="font-medium">Amount</p>
          <div className="flex items-center">
            <CurrencyRupeeRounded fontSize="small" color="action" />
            <p>{order.price}</p>
          </div>
        </div>
        <div className="flex gap-2 justify-between">
          <p className="font-medium">Placed</p>
          <p>{new Date(order.createdAt).toDateString()}</p>
        </div>

        <div className="flex gap-2 justify-between">
          <p className="font-medium">{order.paymentOn ? "Paid" : "Unpaid"}</p>
          {order.paymentOn && <p>{new Date(order.paymentOn).toDateString()}</p>}
        </div>
      </div>
    </Card>
  );
};

export default OrderItem;
