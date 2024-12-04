"use client";
import moment from "moment";
import classes from "./orderItem.module.css";
import clsx from "clsx";
import { CurrencyRupee } from "@mui/icons-material";

const OrderItem = ({ order }) => {
  return (
    <div
      className={clsx([
        classes.container,
        {
          [order.OrderActivity?.[0]?.status?.toLowerCase()]: true,
        },
      ])}
    >
      <div className="flex flex-col items-center">
        <p className="font-bold">{order.user.name}</p>
        <p className="subtle-text text-xs">{order.user.phoneNumber}</p>
      </div>
      <div className="flex flex-col items-center">
        <p>{order.products}</p>
        <p className="subtle-text text-xs">
          {order.items} item{order.items == 1 ? "" : "s"}
        </p>
      </div>
      <div className="flex items-center">
        <CurrencyRupee fontSize={"small"} color={"action"} />
        <p>{order.price}</p>
      </div>
      <div>{moment(order.createdAt).format("D MMM")}</div>
    </div>
  );
};

export default OrderItem;
