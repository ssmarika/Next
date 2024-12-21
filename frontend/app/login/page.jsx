import { Box, FormControl, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const login = () => {
  return (
    <Box>
      <Typography variant="h1">Login</Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string().required().max(64).min(8),
          s,
        })}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <TextField label="Email" />
              </FormControl>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default login;
