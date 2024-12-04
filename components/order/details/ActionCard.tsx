"use client";

import Card from "@/components/common/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CloseRounded,
  DoneRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";
import clsx from "clsx";
import React, { useState } from "react";

const ORDER_STATUS = ["PLACED", "DECLINED", "DELIVERED", "CANCELLED"];

const STATUS_COLOR = {
  PLACED: "#777",
  ACCEPTED: "rgb(180, 180, 0, 1)",
  DECLINED: "#aaa",
  DELIVERED: "rgb(0, 206, 0, 1)",
  CANCELLED: "rgb(202, 0, 0, 1)",
};

const PAYMENT_COLOR = {
  PENDING: "#777",
  RECEIVED: "rgb(0, 206, 0, 1)",
};

const PAYMENT_STATUS = ["PENDING", "RECEIVED"];

function ActionCard({ data, loading = false, action }) {
  const [orderState, setOrderState] = useState({
    status: null,
    payment: null,
  });
  return (
    <Card loading={loading} size="sm">
      {data && (
        <div className="flex flex-row items-end justify-between">
          <div className="flex gap-4 items-end">
            <div className="flex flex-col">
              <p className="text-slate-500">Order</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    style={{
                      backgroundColor:
                        STATUS_COLOR[orderState.status || data.status],
                    }}
                    className={`gap-1" type="button`}
                  >
                    <p>{orderState.status || data.status}</p>
                    <ExpandMoreRounded />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {ORDER_STATUS.filter(
                    (s) => s != (orderState.status || data.status)
                  ).map((s) => (
                    <DropdownMenuItem
                      key={s}
                      onClick={() =>
                        setOrderState((state) => ({ ...state, status: s }))
                      }
                    >
                      {s}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* <div className="flex flex-col">
              <p className="text-slate-500">Payment</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    style={{
                      backgroundColor:
                        PAYMENT_COLOR[orderState.payment || data.payment],
                    }}
                    type="button"
                    className="gap-1"
                  >
                    <p>{orderState.payment || data.payment}</p>
                    <ExpandMoreRounded />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {PAYMENT_STATUS.filter(
                    (p) => p != (orderState.payment || data.payment)
                  ).map((p) => (
                    <DropdownMenuItem
                      key={p}
                      onClick={() =>
                        setOrderState((state) => ({ ...state, payment: p }))
                      }
                    >
                      {p}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}
            <div
              className={clsx([
                {
                  invisible:
                    (data.status == orderState.status || !orderState.status) &&
                    (data.payment == orderState.payment || !orderState.payment),
                },
              ])}
            >
              <Button
                size="icon"
                className="rounded-full"
                variant="ghost"
                type="button"
                onClick={() => action(orderState)}
              >
                <DoneRounded />
              </Button>
              <Button
                size="icon"
                className="rounded-full"
                variant="ghost"
                type="button"
                onClick={() =>
                  setOrderState({
                    status: null,
                    payment: null,
                  })
                }
              >
                <CloseRounded />
              </Button>
            </div>
          </div>
          {/* <div className="flex gap-2">
            {data.paymentOn && (
              <Badge variant="secondary">
                Payment on:{" "}
                {data.paymentOn
                  ? new Date(data.paymentOn).toDateString()
                  : new Date().toDateString()}
              </Badge>
            )}
          </div> */}
        </div>
      )}
    </Card>
  );
}

export default ActionCard;
