import Card from "@/components/common/Card";
import React from "react";

function UserCard({ data: user, loading = false }) {
  return (
    <Card title={"User"} loading={loading}>
      {user && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="font-medium">Name</p>
            <p>{user.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium">Phone Number</p>
            <p>{user.phoneNumber}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium">Email</p>
            <p>{user.email}</p>
          </div>
        </div>
      )}
    </Card>
  );
}

export default UserCard;
