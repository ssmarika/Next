"use client";
import { loginUserValidationSchema } from "@/validation-schema/login.user.validation.schema";
import { Password } from "@mui/icons-material";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const login = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginUserValidationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-between items-center max-w-[600px] shadow-2xl shadow-gray-500 px-8 py-3 min-h-[250px] "
          >
            <Typography variant="h3" color="error">
              Sign Up
            </Typography>

            <FormControl fullWidth>
              <TextField label="Email" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500">{formik.errors.email}</p>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500">{formik.errors.password}</p>
              ) : null}
            </FormControl>

            <Button type="submit" variant="contained" color="success" fullWidth>
              Login
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default login;
