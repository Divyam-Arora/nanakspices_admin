// import { Input } from "@mui/material";
"use client";

import { EventHandler, FormEvent, FormEventHandler, useRef } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useHTTP from "@/hooks/httpRequest";
import { setSesstion, userLogin } from "@/lib/session";
import { redirect, useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { appActions } from "@/store/appSlice";

const LoginForm = () => {
  const emailRef = useRef<any>();
  const passRef = useRef<any>();
  const { data, sendRequest } = useHTTP({ user: null });
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("required"),
    password: Yup.string().required("required"),
  });
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values) => {
          sendRequest("/public/admin/login", {
            method: "POST",
            dataIdentifier: "user",
            body: values,
            action: (data) => {
              console.log(data);
              userLogin(data.token);
            },
          });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          handleBlur,
          isValid,
          dirty,
          touched,
        }) => (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <h1 className="text-2xl mb-5">Login</h1>
            <div>
              <Label htmlFor="input-email">Email</Label>
              <Input
                id="input-email"
                ref={emailRef}
                required
                type="email"
                name="email"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
              />

              {errors.email && touched.email && (
                <p className="text-body-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="input-password">Password</Label>
              <Input
                id="input-password"
                ref={passRef}
                required
                type="password"
                name="password"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {errors.password && touched.password && (
                <p className="text-body-sm text-destructive">
                  {errors.password}
                </p>
              )}
            </div>
            <Button type="submit" disabled={data.user.isLoading}>
              {data.user.isLoading && (
                <ReloadIcon className="animate-spin mr-2" />
              )}
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
