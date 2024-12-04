"use client";

import useHTTP from "@/hooks/httpRequest";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { inventoryActions } from "@/store/inventotySlice";
import React, { useEffect } from "react";

function Data({ children }) {
  const { sendRequest } = useHTTP({
    categories: [],
  });
  const { trigger } = useAppSelector((s) => s.inventory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    sendRequest("/public/category", {
      dataIdentifier: "categories",
      action: (data) =>
        dispatch(inventoryActions.setCategories({ categories: data })),
      axiosOptions: {
        signal: controller.signal,
      },
    });

    return () => controller.abort();
  }, [trigger, sendRequest, dispatch]);
  return <>{children}</>;
}

export default Data;
