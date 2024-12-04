"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = () => {
  const session = cookies().get("token")?.value;
  return session;
};

export const verifySession = () => {
  const session = cookies().get("token")?.value;
  if (!session) redirect("/login");
  return session;
};

export const setSesstion = async (token: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const userLogin = async (token: string) => {
  setSesstion(token);
  redirect("/dashboard");
};

export const updateSession = async () => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("token", cookies().get("token")?.value as string, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const deleteSession = async () => {
  cookies().delete("token");
  redirect("/login");
};
