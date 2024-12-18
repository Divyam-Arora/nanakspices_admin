"use client";

import React from "react";
import { PAGES } from "./PAGES";
import Link from "next/link";
import { useAppSelector } from "@/hooks/storeHooks";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const { visible } = useAppSelector((s) => s.bottomNav);
  const pathName = usePathname();
  return (
    <div
      className={clsx([
        "w-full absolute bottom-0 z-10 sm:hidden transition-all h-20 backdrop-blur-[2px]",
        { "translate-y-full": !visible, "opacity-0": !visible },
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
      </div>
    </div>
  );
};

export default BottomNav;
