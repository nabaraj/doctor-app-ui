import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { Link, Typography } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Header from "./../../components/header/Header"

const useStyles = makeStyles({
  root: {
    padding: "5px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function Login(props) {
  const classes = useStyles();
  return (
    <div>
    <Header path='/login'/>
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid item sm={4} xs={12}>
        <Card className="p-4 my-4">
          <form>
            <h3 className="text-center">Login Form</h3>
            <Typography variant="h6">Login Form</Typography>
            <CardActions justify="center" className="px-0 pt-3">
              <TextField
                className="fullWidth"
                id="standard-basic"
                variant="outlined"
                label="User Id"
              />
            </CardActions>
            <CardActions justify="center" className="px-0 pt-3">
              <TextField
                type="password"
                className="fullWidth"
                id="standard-basic"
                label="Password"
                variant="outlined"
              />
            </CardActions>
            <CardActions justify="center" className="justify-content-center">
              <Button type="submit" variant="contained" color="primary" className="w-50">
                Submit
              </Button>
            </CardActions>
            <div className="text-right">
              <Link href="/registration">Registrion</Link>
            </div>
          </form>
        </Card>
      </Grid>
    </Grid>
    </div>
  );
}
