"use client";

import Card from "@/components/common/Card";
import React from "react";
import OrderItem from "./OrderItem";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import { useParams } from "next/navigation";
import clsx from "clsx";

const Orders = ({ orders }: { orders: any[] }) => {
  const params = useParams();
  return (
    <Card>
      <div className="flex gap-2 justify-between items-center mb-6">
        <h2 className="font-bold">Recent Orders</h2>
        {!!orders.length && (
          <Link href={`/customers/${params.customerId}/orders`}>
            <Button variant="link">
              All Orders <ArrowRightAlt color="action" className="ml-2" />
            </Button>
          </Link>
        )}
      </div>
      <ul className="grid md:grid-cols-2 gap-4">
        {!orders.length && <p>No Orders</p>}
        {orders.map((order) => (
          <Link href={`/orders/${order.id}`} key={order.id}>
            <li>
              <OrderItem order={order} />
            </li>
          </Link>
        ))}
      </ul>
    </Card>
  );
};

export default Orders;
