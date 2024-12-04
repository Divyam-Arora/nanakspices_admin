"use client";

import Card from "@/components/common/Card";
import FilterDialog from "@/components/common/FilterDialog";
import Pagination from "@/components/common/Pagination";
import AddMenu from "@/components/product/AddMenu";
import ProductItem from "@/components/product/ProductItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useHTTP from "@/hooks/httpRequest";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { inventoryActions } from "@/store/inventotySlice";
import { PAGE_DATA, pageActions } from "@/store/pageSlice";
import {
  FilterAltRounded,
  RefreshRounded,
  SearchRounded,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Inventory() {
  const { data, sendRequest } = useHTTP({
    products: {
      list: [],
      meta: null,
    },
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories, category: currentCategory } = useAppSelector(
    (s) => s.inventory
  );
  const page =
    useSearchParams().get("page") || data.products.value.meta?.currentPage || 1;
  const category =
    useSearchParams().get("category") || currentCategory || "all";
  const { filter, list, meta, search, sort, trigger } = useAppSelector(
    (s) => s.page.inventory
  );
  const [input, setInput] = useState(search);

  useEffect(() => {
    const controller = new AbortController();
    sendRequest(
      `/admin/product?page=${page}&category=${category}&filter=${JSON.stringify(
        { filter, sort }
      )}&search=${search}`,
      {
        dataIdentifier: "products",
        protected: true,
        action: (data) => {
          dispatch(pageActions.setItems({ type: "inventory", ...data }));
          dispatch(inventoryActions.setCategory({ category }));
        },
        axiosOptions: {
          signal: controller.signal,
        },
      }
    );
    return () => controller.abort();
  }, [filter, search, sort, trigger, page, category, sendRequest, dispatch]);

  const resetPage = () => {
    window.history.pushState(null, "", `inventory?page=1&category=${category}`);
  };

  return (
    <>
      <div className="page-header-container">
        <h1 className="page-header">Inventory</h1>
        <div className="flex gap-1">
          <form
            className="flex gap-1"
            onSubmit={(e) => {
              e.preventDefault();
              resetPage();
              dispatch(
                pageActions.setSearch({ type: "inventory", search: input })
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
              dispatch(pageActions.refresh({ type: "inventory" }));
            }}
          >
            <RefreshRounded />
          </Button>
          <FilterDialog
            params={PAGE_DATA.inventory}
            state={{ filter, sort }}
            action={(value) => {
              resetPage();
              dispatch(
                pageActions.setFilterAndSort({ type: "inventory", ...value })
              );
            }}
          >
            <Button variant="ghost" size="icon">
              <FilterAltRounded />
            </Button>
          </FilterDialog>
        </div>
      </div>
      <div>
        <Card className="mb-2">
          <div className="flex gap-4 items-center justify-between">
            <Select
              defaultValue={category}
              onValueChange={(value) => {
                window.history.pushState(
                  null,
                  "",
                  `/inventory?page=1&category=${value}`
                );
                dispatch(pageActions.refresh({ type: "inventory" }));
                setInput("");
              }}
            >
              <SelectTrigger className="max-w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <AddMenu />
          </div>
        </Card>
        <div className="flex">
          <Loader show={data.products.isLoading} />
        </div>
        <div className="grid gap-4 auto-rows-min mt-2 md:grid-cols-2">
          {list.map((product: any) => (
            <Link href={`inventory/${product.id}`} key={product.id}>
              <ProductItem product={product} />
            </Link>
          ))}
        </div>
      </div>
      {(!!meta.pageCount || !!data.products.value.meta?.pageCount) && (
        <Pagination
          current={data.products.value.meta?.currentPage || meta.currentPage}
          total={data.products.value.meta?.pageCount || meta.pageCount}
          url={`inventory?category=${category}&`}
        />
      )}
    </>
  );
}

export default Inventory;
