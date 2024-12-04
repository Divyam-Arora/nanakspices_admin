import { refresh } from "@/app/inventory/[productId]/actions";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useHTTP from "@/hooks/httpRequest";
import { AddRounded, EditRounded, Search } from "@mui/icons-material";
import { CaretSortIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

function EditTypeForm({
  productId,
  type,
  children,
}: {
  productId;
  type?;
  children;
}) {
  const [typeState, setTypeState] = useState({
    id: null,
    productId,
    unitId: "",
    price: 0,
    stock: 0,
    availability: true,
    unitName: "",
    unitDescription: "",
    createUnit: false,
  });
  const [unit, setUnit] = useState("");
  const { sendRequest, data } = useHTTP({
    units: [],
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    type &&
      setTypeState((s) => ({
        ...s,
        unitId: type.unit.id,
        id: type.id,
        availability: type.availability,
        price: type.price,
        stock: type.stock,
      }));
    sendRequest(`/admin/unit?search=${unit}`, {
      protected: true,
      dataIdentifier: "units",
    });
  }, [type, sendRequest, unit]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!typeState.createUnit && !typeState.unitId) return;
    console.log(typeState);
    sendRequest(
      `/admin/product/${productId}/type${
        typeState.id ? `/${typeState.id}` : ""
      }`,
      {
        protected: true,
        method: typeState.id ? "PUT" : "POST",
        body: typeState,
        action: (data) => {
          refresh(productId);
          setOpen(false);
        },
      }
    );
  };

  const getUnitDetails = () => {
    const unit = data.units.value.find((f) => f.id == typeState.unitId);
    return unit ? (
      <div className="flex gap-2">
        <p className="font-semibold">{unit.name}</p>
        <p>{unit.description}</p>
      </div>
    ) : (
      "Select Unit"
    );
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type ? "Edit" : "Add"}</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label className="text-right">Unit</Label>
            <div className="flex gap-2 col-start-2 -col-end-1">
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {typeState.createUnit ? "" : getUnitDetails()}
                    <CaretSortIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      value={unit}
                      onValueChange={(value) => setUnit(value)}
                    />
                    <CommandEmpty>No Unit</CommandEmpty>
                    <CommandList>
                      {data.units.value.map((unit) => (
                        <CommandItem
                          key={unit.id}
                          value={unit.id}
                          onSelect={(value) =>
                            setTypeState((s) => ({ ...s, unitId: value }))
                          }
                        >
                          <div className="flex gap-2">
                            <p className="font-semibold">{unit.name}</p>
                            <p>{unit.description}</p>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover> */}
              <Select
                value={typeState.createUnit ? "" : typeState.unitId}
                disabled={typeState.createUnit}
                required
                onValueChange={(value) =>
                  setTypeState((s) => ({ ...s, unitId: value }))
                }
                onOpenChange={(open) => {
                  if (!open) setUnit("");
                }}
              >
                <SelectTrigger>
                  <SelectValue className="flex" placeholder="Select Unit" />
                </SelectTrigger>
                <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
                  <Input
                    className="mb-2"
                    placeholder="Search..."
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    autoFocus={true}
                  />
                  {data.units.value.map((unit) => (
                    <SelectItem
                      key={unit.id}
                      value={unit.id}
                      className="flex gap-2"
                      autoFocus={false}
                    >
                      <p className="font-semibold inline-block mr-2">
                        {unit.name}
                      </p>
                      <p className="inline-block">{unit.description}</p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="icon"
                variant={typeState.createUnit ? "default" : "outline"}
                className="shrink-0"
                type="button"
                onClick={() => {
                  setTypeState((s) => ({ ...s, createUnit: !s.createUnit }));
                }}
              >
                <AddRounded />
              </Button>
            </div>
            {typeState.createUnit && (
              <>
                <Label className="text-right">Name</Label>
                <Input
                  className="col-start-2 -col-end-1"
                  value={typeState.unitName}
                  onChange={(e) =>
                    setTypeState((s) => ({ ...s, unitName: e.target.value }))
                  }
                  placeholder="Unit Name"
                  required
                />
                <Label className="text-right">Description</Label>
                <Input
                  className="col-start-2 -col-end-1"
                  value={typeState.unitDescription}
                  onChange={(e) =>
                    setTypeState((s) => ({
                      ...s,
                      unitDescription: e.target.value,
                    }))
                  }
                  placeholder="Unit Description"
                />
              </>
            )}
            <Label className="text-right">Price</Label>
            <Input
              className="col-start-2 -col-end-1"
              value={typeState.price}
              onChange={(e) =>
                setTypeState((s) => ({ ...s, price: +e.target.value }))
              }
              type="number"
              required
            />
            <Label className="text-right">Stock</Label>
            <Input
              className="col-start-2 -col-end-1"
              value={typeState.stock}
              onChange={(e) =>
                setTypeState((s) => ({ ...s, stock: +e.target.value }))
              }
              type="number"
            />
            <Label className="text-right">Available</Label>
            <ToggleGroup
              type="single"
              value={typeState.availability ? "true" : "false"}
              onValueChange={(value) =>
                setTypeState((s) => ({
                  ...s,
                  availability: value == "true" ? true : false,
                }))
              }
            >
              <ToggleGroupItem value="true" variant="outline">
                Yes
              </ToggleGroupItem>
              <ToggleGroupItem value="false" variant="outline">
                No
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <DialogFooter>
            <Button>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditTypeForm;
