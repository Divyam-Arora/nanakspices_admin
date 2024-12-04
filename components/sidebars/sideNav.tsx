"use client";

import Link from "next/link";
import classes from "./sideNav.module.css";
import {
  HomeRounded,
  InventoryRounded,
  LogoutRounded,
  MenuRounded,
  PeopleRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteSession } from "@/lib/session";

const PAGES = [
  { name: "Home", link: "/dashboard", icon: HomeRounded },
  { name: "Orders", link: "/orders", icon: ReceiptLongRounded },
  { name: "Inventory", link: "/inventory", icon: InventoryRounded },
  { name: "Customers", link: "/customers", icon: PeopleRounded },
];

const SideNav = () => {
  const pathName = usePathname();
  return (
    <nav
      className={clsx([
        classes.nav,
        { [classes.hidden]: pathName == "/login" },
      ])}
    >
      <ul className={classes["sub-section"]}>
        {PAGES.map((page) => (
          <li key={page.name}>
            <Link href={page.link}>
              <div
                className={clsx([
                  classes.item,
                  { [classes.active]: pathName.startsWith(page.link) },
                ])}
              >
                <page.icon color="action" /> <p>{page.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={classes["sub-section"]}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className={clsx([classes.item, "cursor-pointer"])}>
              <MenuRounded color="action" />
              <p>More</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => deleteSession()}>
              <div className="flex gap-2 items-center">
                <LogoutRounded color="action" />
                <p>Logout</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default SideNav;
