"use client";
import { USER_LOGIN_FORM } from "@/constants/forms";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../form-generator";

type Props = {};

const LoginForm = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <h2 className="text-gravel md:text-54xl form-bold">Login</h2>
      <p className="text-iridium md:text-sm">
        You will recieve a one time password
      </p>
      {USER_LOGIN_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  );
};

export default LoginForm;
