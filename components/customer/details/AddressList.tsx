import Card from "@/components/common/Card";
import React from "react";

const AddressList = ({ addresses }: { addresses: any[] }) => {
  return (
    <Card title="Address">
      <ul className="grid md:grid-cols-2 gap-4">
        {!addresses.length && <p>No Address Added</p>}
        {addresses.map((address) => (
          <li
            key={address.id}
            className="grid grid-cols-2 gap-3 p-4 rounded-lg border-slate-200 border-[1px]"
          >
            <div>
              <p>{address.name}</p>
              <p className="text-xs font-light">Name</p>
            </div>
            <div>
              <p>{address.phoneNumber}</p>
              <p className="font-light text-xs">Phone Number</p>
            </div>
            <div>
              <p>{address.line1}</p>
              <p className="font-light text-xs">Line 1</p>
            </div>
            {address.line2 && (
              <div>
                <p>{address.line2}</p>
                <p className="font-light text-xs">Line 2</p>
              </div>
            )}
            {address.landmark && (
              <div>
                <p>{address.landmark}</p>
                <p className="font-light text-xs">Landmark</p>
              </div>
            )}
            <div>
              <p>{address.city}</p>
              <p className="font-light text-xs">City</p>
            </div>
            <div>
              <p>{address.state}</p>
              <p className="font-light text-xs">State</p>
            </div>
            <div>
              <p>{address.pincode}</p>
              <p className="font-light text-xs">Pincode</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default AddressList;
