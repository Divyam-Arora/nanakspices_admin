import React from "react";
import Card from "../common/Card";
import { CurrencyRupeeRounded } from "@mui/icons-material";

const CustomerItem = ({ customer }) => {
  return (
    <Card className="relative">
      {customer.role == "ADMIN" && (
        <div className="absolute top-0 -translate-y-1/2 bg-slate-200 rounded px-2 py-1">
          <p className="text-[0.6rem] tracking-wider font-medium">ADMIN</p>
        </div>
      )}
      <div className="flex gap-1 justify-between">
        <div className="flex gap-2 flex-col">
          <h2 className="text-xl font-medium">{customer.firm}</h2>
          <div>
            <p className="font-medium text-sm">{customer.name}</p>
            <p className="font-light text-sm">{customer.email}</p>
            <p className="font-light text-sm">{customer.phoneNumber}</p>
          </div>
          <div>
            <div className="flex items-center">
              <CurrencyRupeeRounded color="action" fontSize="small" />
              <p className="font-medium text-lg">
                {customer.Balance.amount || "0.0"}
              </p>
            </div>
            {/* <p className="font-light text-sm">Balance</p> */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerItem;
