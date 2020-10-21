import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { CircularProgress, Link, Typography, Avatar } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { userLogin,resetLogin } from "../../actions/loginAction";
import Header from "./../../components/header/Header";
import { Redirect } from "react-router-dom";

const initialState = {
  userName: "",
  password: "",
}
export default function Login(props) {
  const [account, setAccount] = useState(initialState);
  const {loginLoading, userLoggedIn} = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetLogin())
  },[])
  const changeField = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let user = { ...account, [name]: value };
    setAccount(user);
  };
  const submitLoginForm = (e) => {
    e.preventDefault();
    dispatch(userLogin(account));
    setAccount(initialState);
  };
  if(userLoggedIn){
    return <Redirect to="/home" />
  }
  
  return (
    <div>
      {/* <Header path="/login" history={props.history} /> */}
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item sm={4} xs={12}>
          <Card className="p-4 my-4">
            <form onSubmit={submitLoginForm}>
              <Typography variant="h6" className="text-center">
              <div className="d-flex justify-content-center"><Avatar alt="Remy Sharp" src="./heart.svg" /> </div>
              Login Form
              </Typography>
              <CardActions justify="center" className="px-0 pt-3">
                <TextField
                  className="fullWidth"
                  id="userName"
                  name="userName"
                  variant="outlined"
                  label="User Id"
                  value={account.userName}
                  onChange={changeField}
                  disabled={loginLoading}
                />
              </CardActions>
              <CardActions justify="center" className="px-0 pt-3">
                <TextField
                  type="password"
                  className="fullWidth"
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={account.password}
                  onChange={changeField}
                  disabled={loginLoading}
                />
              </CardActions>
              <CardActions justify="center" className="justify-content-center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-50"
                  // disabled={(!account.userName && !account.password) || loginLoading}
                >
                  Submit
                  {loginLoading && <div className="pl-2 w-15 d-flex justify-content-center">
                      <CircularProgress color="secondary" className="w-75" size="20"/>
                    </div>}
                </Button>
              </CardActions>
              <div className="text-right d-none">
                <Link href="/registration">Registrion</Link>
              </div>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
