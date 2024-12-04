"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useHTTP from "@/hooks/httpRequest";
import { userLogin } from "@/lib/session";
import React from "react";

function Login() {
  const { data, sendRequest } = useHTTP({
    user: null,
  });
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    sendRequest("/public/admin/login", {
      dataIdentifier: "user",
      protected: true,
      method: "POST",
      body: Object.fromEntries(data.entries()),
      action: (data) => {
        userLogin(data.token);
      },
    });
  };
  return (
    <div className="flex items-center justify-center w-full h-full">
      <form className="flex flex-col gap-6" onSubmit={(e) => loginHandler(e)}>
        <div className="flex flex-col gap-4">
          <div>
            <Label>Password</Label>
            <Input type="password" name="password" required />
          </div>
        </div>

        <Button variant="default">Login</Button>
      </form>
    </div>
  );
}

export default Login;
