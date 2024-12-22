"use client";
import { registerUserValidationSchema } from "@/validation-schema/register.user.validation";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";

const register = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        role: "",
      }}
      validationSchema={registerUserValidationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-between items-center max-w-[600px] shadow-2xl shadow-gray-500 px-8 py-3 min-h-[250px] gap-3"
          >
            <Typography variant="h3" color="error">
              Register
            </Typography>

            <div className="flex gap-4">
              <FormControl>
                <TextField
                  label="First Name"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <FormHelperText error>
                    {formik.errors.firstName}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField
                  label="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <FormHelperText error>
                    {formik.errors.lastName}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>

            <FormControl fullWidth>
              <TextField label="Email" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500">{formik.errors.email}</p>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                type="password"
                label="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500">{formik.errors.password}</p>
              ) : null}
            </FormControl>

            <div className="flex gap-4">
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  {...formik.getFieldProps("role")}
                  sx={{ minWidth: "220px" }}
                >
                  <MenuItem value="buyer">Buyer</MenuItem>
                  <MenuItem value="seller">Seller</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  {...formik.getFieldProps("gender")}
                  sx={{ minWidth: "220px" }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              size="large"
            >
              Register
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default register;
