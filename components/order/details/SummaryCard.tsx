import Card from "@/components/common/Card";
import { CurrencyRupeeRounded } from "@mui/icons-material";
import React from "react";

function SummaryCard({ data, loading = false }) {
  return (
    <Card title={"Summary"} loading={loading} className="">
      {data && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="font-medium">Order Id</p>
            <p>{data.id}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium">Items</p>
            <p>{data.products}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium">Amount</p>
            <p className="flex items-center">
              <CurrencyRupeeRounded fontSize="small" color="action" />
              {data.price}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium">Date</p>
            <p>{new Date(data.createdAt).toDateString()}</p>
          </div>
        </div>
      )}
    </Card>
  );
}

export default SummaryCard;
