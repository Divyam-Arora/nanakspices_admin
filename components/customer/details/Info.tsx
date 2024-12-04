import Card from "@/components/common/Card";
import {
  AccessTime,
  AccessTimeFilled,
  AccessTimeRounded,
  EmailOutlined,
  EmailRounded,
  Loyalty,
  LoyaltyOutlined,
  LoyaltyRounded,
  Paid,
  PhoneOutlined,
  PhoneRounded,
  ReceiptLong,
  ReceiptLongRounded,
  ReceiptRounded,
  TimerRounded,
} from "@mui/icons-material";
import React from "react";

const Info = ({ customer }) => {
  return (
    <Card>
      <div className="grid grid-cols-2 grid-flow-row gap-6 p-2">
        <h1 className="text-4xl col-span-full px-4">{customer.name}</h1>
        <div className="flex gap-4 items-center">
          <EmailRounded color="action" />
          <div className="flex flex-col">
            <p>{customer.email}</p>
            <p className="font-light text-xs">Email</p>
          </div>
        </div>
        <div className="flex gap-4 items-center row-start-3">
          <PhoneRounded color="action" />
          <div className="flex flex-col">
            <p>{customer.phoneNumber}</p>
            <p className="font-light text-xs">Phone Number</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Paid color="action" />
          <div className="flex flex-col">
            <p>{customer.Balance.amount || "0.0"}</p>
            <p className="font-light text-xs">Outstanding Balance</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <ReceiptLong color="action" />
          <div className="flex flex-col">
            <p>{customer.gstNumber || "Not Available"}</p>
            <p className="font-light text-xs">GST number</p>
          </div>
        </div>
        <div className="flex gap-4 items-center row-start-4">
          <AccessTimeFilled color="action" />
          <div className="flex flex-col">
            <p>{new Date(customer.createdAt).toDateString()}</p>
            <p className="font-light text-xs">Joined</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Loyalty color="action" />
          <div className="flex flex-col">
            <p>{customer._count.Order}</p>
            <p className="font-light text-xs">Orders</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Info;
