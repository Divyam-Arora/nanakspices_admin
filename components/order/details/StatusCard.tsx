import Card from "@/components/common/Card";
import clsx from "clsx";
import React from "react";

function StatusCard({ list = [], loading = false }) {
  return (
    <Card title={"Status"} loading={loading}>
      <div className="flex flex-col">
        {list.map((item, i) => (
          <div key={item.id} className="flex justify-between items-start">
            <div>
              <p
                className={clsx([
                  {
                    "font-semibold": i == 0,
                  },
                ])}
              >
                {item.status}
              </p>
              {i < list.length - 1 && <div>|</div>}
            </div>
            <p>{new Date(item.createdAt).toDateString()}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default StatusCard;
