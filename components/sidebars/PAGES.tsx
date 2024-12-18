"use client";
import {
  HomeRounded,
  ReceiptLongRounded,
  InventoryRounded,
  PeopleRounded,
} from "@mui/icons-material";

export const PAGES = [
  { name: "Home", link: "/dashboard", icon: HomeRounded },
  { name: "Orders", link: "/orders", icon: ReceiptLongRounded },
  { name: "Inventory", link: "/inventory", icon: InventoryRounded },
  { name: "Customers", link: "/customers", icon: PeopleRounded },
];
