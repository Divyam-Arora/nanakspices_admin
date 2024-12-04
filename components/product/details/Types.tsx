"use client";

import Card from "@/components/common/Card";
import { Button } from "@/components/ui/button";
import {
  AddRounded,
  CurrencyRupeeRounded,
  EditRounded,
} from "@mui/icons-material";
import React from "react";
import Type from "./Type";
import TypeOrderEditor from "./TypeOrderEditor";
import EditTypeForm from "./EditTypeForm";

function Types({ productId, productTypes = [], loading = false }) {
  return (
    <Card loading={loading}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">Product Types</h2>
          {!!productTypes.length && (
            <div>
              <TypeOrderEditor productId={productId} types={productTypes}>
                <Button size="icon" variant="ghost">
                  <EditRounded fontSize="small" />
                </Button>
              </TypeOrderEditor>
            </div>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {!productTypes.length && (
            // <div className="flex items-center justify-center rounded-lg bg-primary-foreground h-40 cursor-pointer">
            <EditTypeForm productId={productId}>
              <Button variant="secondary" className="h-40">
                <AddRounded fontSize="large" color="action" />
              </Button>
            </EditTypeForm>
            // </div>
          )}
          {productTypes.map((type) => (
            <Type key={type.id} type={type} />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default Types;
