"use client";

import { useAppDispatch } from "@/hooks/storeHooks";
import { bottomNavActions } from "@/store/bottomNavSlice";
import React from "react";
import { useDispatch } from "react-redux";

const ContentPage = ({ children }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="page"
      //   onScroll={(e) => {
      //     dispatch(bottomNavActions.onScroll({ pos: e.currentTarget.scrollTop }));
      //   }}
    >
      {children}
    </div>
  );
};

export default ContentPage;
