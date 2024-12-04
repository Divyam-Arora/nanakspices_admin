import BackButton from "@/components/common/BackButton";
import Pagination from "@/components/common/Pagination";
import OrderItem from "@/components/customer/details/OrderItem";
import { getData } from "@/hooks/root";
import Link from "next/link";
import React from "react";

const page = async ({ params, searchParams }) => {
  const [orders, meta]: [any[], any] = await getData(
    `/admin/customer/${params.customerId}/order?page=${searchParams.page || 1}`
  );
  console.log(meta);
  return (
    <>
      <div className="page-header-container sticky top-0">
        <div className="flex gap-2 items-center">
          <BackButton />
          <h1 className="page-header">Customer Orders</h1>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 auto-rows-min">
        {orders.map((order) => (
          <Link key={order.id} href={`/orders/${order.id}`}>
            <div className="h-full">
              <OrderItem order={order} />
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        current={+searchParams.page || 1}
        total={meta.pageCount || 1}
        url={`/customers/${params.customerId}/orders/?`}
      />
    </>
  );
};

export default page;
