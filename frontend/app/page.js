"use client";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Daraz
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            router.push("/registration");
          }}
        >
          Register
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
