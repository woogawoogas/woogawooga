import React from "react";
import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";

export default function Header({ children }) {
  return (
    <AppBar position="static" sx={AppCss}>
      <Toolbar sx={{ justifyContent: "space-between" }}>{children}</Toolbar>
    </AppBar>
  );
}
const AppCss = {
  display: "flex",
  backgroundColor: "white",
  justifyContent: "space-between",
  borderBottom: "0.5px solid gainsboro",
  boxShadow: "none",
  color: "gray",
  fontWeight: "bold",
  "*": {},
};
