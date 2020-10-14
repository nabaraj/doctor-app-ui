import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { pathConst } from "./../../utils/const";

export default function Header({ path }) {
  console.log(path);
  const pathNameObject = path ? pathConst[path] : "";
  console.log(pathNameObject);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{pathNameObject ? pathNameObject.title: ''}</Typography>
      </Toolbar>
    </AppBar>
  );
}
