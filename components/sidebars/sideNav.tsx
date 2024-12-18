"use client";

import Link from "next/link";
import classes from "./sideNav.module.css";
import { LogoutRounded, MenuRounded } from "@mui/icons-material";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteSession } from "@/lib/session";
import { PAGES } from "./PAGES";

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
                <page.icon color="action" />{" "}
                <p className={classes.label}>{page.name}</p>
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
              <p className={classes.label}>More</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ml-4">
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
