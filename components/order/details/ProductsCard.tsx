import Card from "@/components/common/Card";
import React from "react";
import OrderedProductCard from "./OrderedProductCard";
import clsx from "clsx";

function ProductsCard({ list = [], loading = false }) {
  return (
    <Card title={"Products"} loading={loading}>
      <div className={clsx(["grid grid-cols-1 md:grid-cols-2 gap-4"])}>
        {list.map((productType) => (
          <OrderedProductCard productType={productType} key={productType.id} />
        ))}
      </div>
    </Card>
  );
}

export default ProductsCard;
