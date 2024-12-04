import { useEffect } from "react";
import useHTTP from "./httpRequest";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { inventoryActions } from "@/store/inventotySlice";

const useData = () => {
  const { sendRequest } = useHTTP({
    categories: [],
  });
  const dispatch = useAppDispatch();
  const { trigger } = useAppSelector((s) => s.inventory);

  useEffect(() => {
    sendRequest("/public/category", {
      dataIdentifier: "categories",
      action: (data) =>
        dispatch(inventoryActions.setCategories({ categories: data })),
    });
  }, [trigger]);
};

export default useData;
