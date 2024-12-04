import Card from "@/components/common/Card";
import OrderedProductCard from "@/components/order/details/OrderedProductCard";
import { CurrencyRupeeRounded } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

const Cart = ({ cart }: { cart: any[] }) => {
  return (
    <Card>
      <div className="flex gap-2 justify-between items-start mb-6">
        <h2 className="font-bold">Cart</h2>
        {!!cart.length && (
          <div className="flex items-center">
            <p className="text-sm font-light">Total Amount:</p>
            <CurrencyRupeeRounded
              fontSize="small"
              color="action"
              className="ml-1"
            />
            <p>
              {cart.reduce(
                (acc, item) => item.quantity * item.productType.price,
                0
              )}
            </p>
          </div>
        )}
      </div>
      <ul className="grid md:grid-cols-2 gap-4">
        {!cart.length && <p>Cart is Empty</p>}
        {cart.map((cartItem) => (
          <Link
            href={`/inventory/${cartItem.productType.product.id}`}
            key={cartItem.id}
          >
            <OrderedProductCard
              productType={{
                ...cartItem.productType,
                quantity: cartItem.quantity,
              }}
            />
          </Link>
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
