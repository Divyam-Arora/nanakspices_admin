import Card from "@/components/common/Card";
import React from "react";

function AddressCard({ data, loading = false }) {
  return (
    <Card title={"Address"} loading={loading}>
      {data && (
        <div className="flex flex-col gap-2">
          <p>{data.line1}</p>
          {data.line2 && <p>{data.line2}</p>}
          <p>{data.city}</p>
          <p>{data.state}</p>
          <p>{data.pincode}</p>
        </div>
      )}
    </Card>
  );
}

export default AddressCard;
