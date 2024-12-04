"use client";

import useHTTP from "@/hooks/httpRequest";
import { useEffect } from "react";
import OrderItem from "./orderItem";
import Loader from "../ui/loader";
import Link from "next/link";

const OrderList = ({ list = [], loading }) => {
  return (
    <ul className="flex flex-col gap-2">
      <Loader show={loading} />
      {list.map((order) => (
        <li key={order.id}>
          <Link href={`orders/${order.id}`}>
            <OrderItem order={order} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
