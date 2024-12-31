"use client";

import React, { useState } from "react";
import { PAGES } from "./PAGES";
import Link from "next/link";
import { useAppSelector } from "@/hooks/storeHooks";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
// import { MenuRounded } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { LogoutRounded, MoreHorizRounded } from "@mui/icons-material";
import { Button } from "../ui/button";
import { deleteSession } from "@/lib/session";

const BottomNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { visible } = useAppSelector((s) => s.bottomNav);
  const pathName = usePathname();
  return (
    <div
      className={clsx([
        "w-full absolute bottom-0 z-10 sm:hidden transition-all h-20 backdrop-blur-[2px]",
        {
          "translate-y-full": !visible || pathName.startsWith("/login"),
          "opacity-0": !visible || pathName.startsWith("/login"),
        },
      ])}
      style={{
        background: "linear-gradient(0deg, #fff, transparent)",
      }}
    >
      <div className="w-full h-full flex items-center">
        {PAGES.map((page) => (
          <Link key={page.name} href={page.link} className="flex-1">
            <div className="flex flex-col items-center">
              <page.icon
                color={pathName.startsWith(page.link) ? "inherit" : "action"}
              />
              <p
                className={clsx(["text-sm"], {
                  "text-primary font-semibold": pathName.startsWith(page.link),
                })}
              >
                {page.name}
              </p>
            </div>
          </Link>
        ))}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger className="flex-1">
            <div className="flex flex-col items-center flex-1">
              <MoreHorizRounded color="action" />
              <p className="text-sm">More</p>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col p-2 gap-2">
              <Button
                variant="ghost"
                className="flex justify-start gap-4 p-4"
                onClick={() => {
                  setDrawerOpen(false);
                  deleteSession();
                }}
              >
                <LogoutRounded color="action" />
                <p>Logout</p>
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default BottomNav;
