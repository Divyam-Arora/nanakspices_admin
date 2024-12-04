"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "./root";
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { appActions } from "../store/appSlice";
import { toast } from "sonner";
import { Alert } from "@mui/material";
import {
  ErrorOutlineRounded,
  ErrorRounded,
  PriorityHighRounded,
  Report,
  ReportOffOutlined,
} from "@mui/icons-material";
import { getSession } from "@/lib/session";

type requestProps<identifierType = string> = {
  protected?: boolean;
  customError?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  action?: Function;
  axiosOptions?: AxiosRequestConfig;
  dataIdentifier?: identifierType;
  globalLoader?: boolean;
};

// function useHTTP<S = undefined>(initialState: S | undefined){}

function useHTTP<initType = object>(initialState?: initType) {
  const [data, setData] = useState<
    | {
        [key in keyof typeof initialState]: {
          value: (typeof initialState)[key];
          isLoading: boolean;
          error: string;
          statusCode: number;
          controller: AbortController;
        };
      }
    | null
  >(initializeData());
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  // const [queue, setQueue] = useState<
  //   {
  //     url: string;
  //     options: requestProps<keyof typeof initialState>;
  //   }[]
  // >([]);
  let token;
  const dispatch = useAppDispatch();

  function initializeData() {
    let state:
      | null
      | {
          [key in keyof initType]: {
            value: initType[key];
            isLoading: boolean;
            error: string;
            statusCode: number;
            controller: AbortController;
          };
        } = null;

    if (initialState)
      for (let k in initialState) {
        const key = k as keyof initType;
        const value = initialState[k] as initType[keyof initType];
        if (!state)
          state = {
            ...state,
            [key]: {
              value,
              isLoading: false,
              error: "",
              statusCode: 0,
              controller: new AbortController(),
            },
          };
        else {
          state[key] = {
            value: value,
            error: "",
            isLoading: false,
            statusCode: 0,
            controller: new AbortController(),
          };
        }
      }

    return state;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   // console.log("queue length", queue.length);
  //   if (!isSending && queue.length) {
  //     console.log("queue added");
  //     const item = queue[0];
  //     _sendRequest(item.url, item.options);
  //     setQueue((s) => {
  //       s.splice(0, 1);
  //       return [...s];
  //     });
  //   }
  // }, [isSending, !!queue.length]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const sendRequest = async (
  //   url: string,
  //   options?: requestProps<keyof typeof initialState>
  // ) => {
  //   console.log("send request called", options, queue);
  //   setQueue((q) => [
  //     ...q,
  //     {
  //       url,
  //       options,
  //     },
  //   ]);
  // };

  const sendRequest = useCallback(
    async (
      url: string,
      options: requestProps<keyof typeof initialState> = { method: "GET" }
    ) => {
      // console.log("in sendRequest", config);
      const controller = new AbortController();
      setIsSending(true);
      options.globalLoader && dispatch(appActions.setLoading());
      options.dataIdentifier &&
        setData((s) => {
          if (options.dataIdentifier && s && s[options.dataIdentifier]) {
            return {
              ...s,
              [options.dataIdentifier]: {
                ...s[options.dataIdentifier as keyof initType],
                statusCode: undefined,
                isLoading: true,
                controller: new AbortController(),
              },
            };
          } else return s;
        });
      console.log(`sending ${options.method || "GET"} request to ${url}`);
      token = await getSession();
      // console.log("request", options);
      // try {
      return api
        .request({
          ...options.axiosOptions,
          url,
          headers: {
            Authorization: `bearer ${token}`,
          },
          method: options.method || "GET",
          data: options.body,
        })
        .then((res) => {
          console.log(res.data);
          options.dataIdentifier &&
            setData((s) => {
              if (options.dataIdentifier) {
                return {
                  ...s,
                  [options.dataIdentifier]: {
                    ...s[options.dataIdentifier as keyof initType],
                    value: res.data,
                    statusCode: res.status,
                  },
                };
              } else return s;
            });
          options.action && options.action(res.data);
        })
        .catch((error) => {
          console.log(error);
          if (error?.code !== "ERR_CANCELED") {
            setError(
              (error.response?.data as string) ||
                error.message ||
                "Something went wrong"
            );
            options.dataIdentifier &&
              setData((s) => {
                if (options.dataIdentifier)
                  return {
                    ...s,
                    [options.dataIdentifier]: {
                      ...s[options.dataIdentifier as keyof initType],
                      error:
                        (error?.response?.data as string) ||
                        error.message ||
                        "Something went wrong",
                      statusCode: error.status,
                    },
                  };
                else return s;
              });
            console.log(error?.response?.data?.error);
            dispatch(
              appActions.setError({
                error:
                  options.customError ||
                  error.response?.data?.error ||
                  error.message ||
                  "Something went wrong",
              })
            );
            toast(
              options.customError ||
                error.response?.data?.error ||
                error.message ||
                "Something went wrong",
              {
                dismissible: true,
                icon: <ErrorOutlineRounded className="text-destructive" />,
              }
            );
          }
        })
        .finally(() => {
          setIsSending(false);
          options.globalLoader && dispatch(appActions.clearLoading());
          options.dataIdentifier &&
            setData((s) => {
              if (options.dataIdentifier)
                return {
                  ...s,
                  [options.dataIdentifier]: {
                    ...s[options.dataIdentifier as keyof initType],
                    isLoading: false,
                  },
                };
              else return s;
            });
        });
    },
    []
  );

  const reset = () => {
    initializeData();
    setError("");
  };

  return {
    data,
    error,
    sendRequest,
    isSending,
    reset,
  };
}

export default useHTTP;
