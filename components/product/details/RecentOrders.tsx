"use client";

import Card from "@/components/common/Card";
import React from "react";
import OrderItem from "./OrderItem";
import Link from "next/link";

function RecentOrders({ orders = [], loading = false, name = "the product" }) {
  return (
    <Card loading={loading}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-bold">Recent Orders</h2>
      </div>
      <div>
        {!orders.length && <div>No recent order for {name}</div>}
        <div className="grid md:grid-cols-2 gap-4">
          {orders.map(({ order }) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <OrderItem order={order} />
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default RecentOrders;
