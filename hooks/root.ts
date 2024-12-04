import { getSession } from "@/lib/session";
import axios from "axios";

// export const baseURL = `http://192.168.1.5:8080/api`;
export const baseURL = `http://13.201.99.114/api`;

export const api = axios.create({
  baseURL,
});

export const getData = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
) => {
  try {
    const res = await api.request({
      method,
      url,
      data: body,
      headers: {
        Authorization: `bearer ${await getSession()}`,
      },
    });

    // console.log(url, method, body, res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
