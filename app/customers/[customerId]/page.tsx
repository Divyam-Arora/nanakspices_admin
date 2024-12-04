import BackButton from "@/components/common/BackButton";
import AddressList from "@/components/customer/details/AddressList";
import Cart from "@/components/customer/details/Cart";
import Info from "@/components/customer/details/Info";
import Orders from "@/components/customer/details/Orders";
import TransactionHistory from "@/components/customer/details/TransactionHistory";
import { getData } from "@/hooks/root";
import React from "react";

const page = async ({ params }) => {
  const customer = await getData(`/admin/customer/${params.customerId}`);
  console.log(customer);
  return (
    <>
      <div className="page-header-container sticky top-0">
        <div>
          <BackButton />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Info customer={customer} />
        <AddressList addresses={customer.Address} />
        <Cart cart={customer.Cart} />
        <Orders orders={customer.Order} />
        <TransactionHistory transactions={customer.TransactionHistory} />
      </div>
    </>
  );
};

export default page;
