"use client";

import FilterDialog from "@/components/common/FilterDialog";
import Pagination from "@/components/common/Pagination";
import OrderList from "@/components/order/orderList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useHTTP from "@/hooks/httpRequest";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { PAGE_DATA, pageActions } from "@/store/pageSlice";
import {
  FilterAltRounded,
  FilterRounded,
  RefreshRounded,
  SearchRounded,
} from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Orders() {
  const {
    order: { filter, list, meta, refresh, search, sort, trigger },
  } = useAppSelector((s) => s.page);
  const { data, sendRequest } = useHTTP({
    orders: {
      list: [],
      meta: {
        currentPage: null,
        pageCount: null,
      },
    },
  });
  const dispatch = useAppDispatch();
  const [input, setInput] = useState(search);
  const page = useSearchParams().get("page");
  useEffect(() => {
    const controller = new AbortController();
    sendRequest(
      `/admin/order?page=${
        page || meta.currentPage || 1
      }&search=${search}&filter=${JSON.stringify({
        filter,
        sort,
      })}`,
      {
        dataIdentifier: "orders",
        protected: true,
        action: (data) => {
          dispatch(pageActions.setItems({ type: "order", ...data }));
        },
        axiosOptions: {
          signal: controller.signal,
        },
      }
    );

    return () => controller.abort();
  }, [filter, search, sort, trigger, page, sendRequest]);

  const resetPage = () => {
    window.history.pushState(null, "", "orders?page=1");
  };
  return (
    <>
      <div className="page-header-container sticky top-0">
        <h1 className="page-header">Orders</h1>
        <div className="flex gap-1">
          <form
            className="flex gap-1"
            onSubmit={(e) => {
              e.preventDefault();
              resetPage();
              dispatch(pageActions.setSearch({ type: "order", search: input }));
            }}
          >
            <Input
              placeholder="Search here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button variant="ghost" size="icon" className="shrink-0">
              <SearchRounded />
            </Button>
          </form>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              resetPage();
              setInput("");
              dispatch(pageActions.refresh({ type: "order" }));
            }}
          >
            <RefreshRounded />
          </Button>
          <FilterDialog
            params={PAGE_DATA.order}
            state={{ filter, sort }}
            action={(value) => {
              resetPage();
              dispatch(
                pageActions.setFilterAndSort({ type: "order", ...value })
              );
            }}
          >
            <Button variant="ghost" size="icon">
              <FilterAltRounded />
            </Button>
          </FilterDialog>
        </div>
      </div>
      <OrderList list={list} loading={data.orders.isLoading} />
      {(!!data.orders.value.meta.pageCount || !!meta.pageCount) && (
        <Pagination
          current={data.orders.value.meta.currentPage || meta.currentPage}
          total={data.orders.value.meta.pageCount || meta.pageCount}
          url="/orders?"
        />
      )}
    </>
  );
}

export default Orders;
