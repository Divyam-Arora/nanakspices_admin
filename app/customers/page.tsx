"use client";

import FilterDialog from "@/components/common/FilterDialog";
import CustomerItem from "@/components/customer/CustomerItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import useHTTP from "@/hooks/httpRequest";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { PAGE_DATA, pageActions } from "@/store/pageSlice";
import {
  Filter1Rounded,
  FilterAltRounded,
  RefreshRounded,
  SearchRounded,
} from "@mui/icons-material";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Customers() {
  const { sendRequest, data } = useHTTP({
    customers: {
      list: [],
      meta: {
        pageCount: null,
        currentPage: null,
      },
    },
  });
  const page = useSearchParams().get("page") || 1;
  const dispatch = useAppDispatch();
  const { list, meta, filter, search, sort, trigger } = useAppSelector(
    (s) => s.page.customer
  );
  const [input, setInput] = useState(search);

  useEffect(() => {
    const controller = new AbortController();
    sendRequest(
      `/admin/customer?page=${page}&search=${search}&filter=${JSON.stringify({
        filter,
        sort,
      })}`,
      {
        protected: true,
        dataIdentifier: "customers",
        axiosOptions: { signal: controller.signal },
        action: (data) => {
          dispatch(pageActions.setItems({ type: "customer", ...data }));
        },
      }
    );

    return () => controller.abort();
  }, [sendRequest, page, dispatch, search, filter, sort, trigger]);
  const resetPage = () => {
    window.history.pushState(null, "", "/customers?page=1");
  };
  return (
    <>
      <div className="page-header-container sticky top-0">
        <h1 className="page-header">Customers</h1>
        <div className="flex gap-1">
          <form
            className="flex gap-1"
            onSubmit={(e) => {
              e.preventDefault();
              resetPage();
              dispatch(
                pageActions.setSearch({ type: "customer", search: input })
              );
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
              dispatch(pageActions.refresh({ type: "customer" }));
            }}
          >
            <RefreshRounded />
          </Button>
          <FilterDialog
            params={PAGE_DATA.customer}
            state={{ filter, sort }}
            action={(value) => {
              resetPage();
              dispatch(
                pageActions.setFilterAndSort({ type: "customer", ...value })
              );
            }}
          >
            <Button variant="ghost" size="icon">
              <FilterAltRounded />
            </Button>
          </FilterDialog>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex">
          <Loader show={data.customers.isLoading} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
          {list.map((customer) => (
            <Link key={customer.id} href={`/customers/${customer.id}`}>
              <CustomerItem customer={customer} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Customers;
