import BackButton from "@/components/common/BackButton";
import ActionCard from "@/components/order/details/ActionCard";
import AddressCard from "@/components/order/details/AddressCard";
import OrderedProductCard from "@/components/order/details/OrderedProductCard";
import ProductsCard from "@/components/order/details/ProductsCard";
import StatusCard from "@/components/order/details/StatusCard";
import SummaryCard from "@/components/order/details/SummaryCard";
import UserCard from "@/components/order/details/UserCard";
import { api, getData } from "@/hooks/root";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import React from "react";
import { toast } from "sonner";

async function Order({ params }) {
  const data = await getData(`/admin/order/${params.orderId}`);
  // console.log(data);

  const handleAction = async (state) => {
    "use server";
    // await fetch(
    //   `http://127.0.0.1:8080/api/admin/order/${params.orderId}/update`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(state),
    //     headers: {
    //       authorization: `bearer ${token}`,
    //       "Content-type": "application/json",
    //     },
    //   }
    // );
    const temp = await getData(
      `/admin/order/${params.orderId}/update`,
      "PUT",
      state
    );
    revalidatePath(`/order/${params.orderId}`, "page");
  };
  return (
    <>
      <div className="page-header-container sticky top-0">
        <h1 className="page-header">
          <BackButton />
        </h1>
      </div>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        <div className="col-span-full">
          <ActionCard data={data} action={handleAction} />
        </div>
        <SummaryCard data={data} />
        <UserCard data={data.user} />
        <StatusCard list={data.OrderActivity} />
        <AddressCard data={data.address} />
        <div className="col-span-full">
          <ProductsCard list={data.OrderedProducts} />
        </div>
      </div>
    </>
  );
}

export default Order;
