"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useHTTP from "@/hooks/httpRequest";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Type from "./Type";
import { Button } from "@/components/ui/button";
import {
  AddRounded,
  ArrowBackIos,
  ArrowBackIosNewRounded,
  ArrowForwardIos,
  ArrowForwardIosRounded,
  DeleteRounded,
  EditRounded,
} from "@mui/icons-material";
import clsx from "clsx";
import { revalidatePath } from "next/cache";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import EditTypeForm from "./EditTypeForm";
import { changePosition } from "@/lib/utils";
import { refresh } from "@/app/inventory/[productId]/actions";

function TypeOrderEditor({ productId, types, children }) {
  const { data, sendRequest } = useHTTP({
    types: [],
  });
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [ordered, setOrdered] = useState([]);
  const [typeMap, setTypeMap] = useState({});
  // const params = useParams();

  useEffect(() => {
    const typeOrder = [];
    const typesMap = {};
    types.forEach((type, i) => {
      typesMap[type.id] = type;
      typeOrder.push(type.id);
    });
    setTypeMap(typesMap);
    setOrdered(typeOrder);
  }, [types]);

  const changeOrder = (direction: 1 | -1) => {
    setOrdered((state) => {
      return changePosition(state, current, direction);
    });
  };

  const sendTypePostion = () => {
    sendRequest(`/admin/product/${productId}/type/position`, {
      protected: true,
      method: "PUT",
      body: { position: ordered },
      action: (data) => {
        setCurrent(null);
        setOpen(false);
        refresh(productId);
      },
    });
  };

  // const editTypeHandler = (type) => {
  //   setTypeMap((s) => ({ ...s, [type.id]: type }));
  //   refresh(productId)
  // };

  // const addTypeHandler = (type) => {
  //   setTypeMap((s) => ({ ...s, [type.id]: type }));
  //   setOrdered((s) => [...s, type.id]);
  //   refresh(productId)
  // };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95%] max-w-[50rem] max-h-[90vh] overflow-y-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Product Types</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2 overflow-y-auto max-h-full">
          {ordered.map((id) => (
            <div
              key={id}
              onClick={() =>
                setCurrent((s) => {
                  if (s == id) return null;
                  else return id;
                })
              }
              //   style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
              className={clsx([
                "rounded-lg transition cursor-pointer border h-full",
                {
                  "border-transparent": !current,
                  "border-primary": current,
                  "opacity-50 border-transparent": current && id != current,
                },
              ])}
            >
              <Type type={typeMap[id]} />
            </div>
          ))}
        </div>
        <DialogFooter>
          {
            <div className="grid grid-cols-3 w-full gap-4 items-center">
              <div className="flex gap-2 justify-self-start">
                <EditTypeForm productId={productId}>
                  <Button variant="outline" size="icon">
                    <AddRounded />
                  </Button>
                </EditTypeForm>
                {current && (
                  <>
                    <EditTypeForm productId={productId} type={typeMap[current]}>
                      <Button variant="outline" size="icon">
                        <EditRounded fontSize="small" />
                      </Button>
                    </EditTypeForm>
                    {/* <Button variant="outline" size="icon">
                      <DeleteRounded fontSize="small" color="warning" />
                    </Button> */}
                  </>
                )}
              </div>
              {!current && <p className="text-center">Select a type</p>}
              {current && (
                <div className="flex gap-2 justify-self-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => changeOrder(-1)}
                  >
                    <ArrowBackIosNewRounded fontSize="small" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => changeOrder(1)}
                  >
                    <ArrowForwardIosRounded fontSize="small" />
                  </Button>
                </div>
              )}
              <Button
                onClick={() => sendTypePostion()}
                className="justify-self-end"
              >
                Save
              </Button>
            </div>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TypeOrderEditor;
