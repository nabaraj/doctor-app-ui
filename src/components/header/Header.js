import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { Avatar, IconButton, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { profileLogout } from "./../../actions/loginAction";
import { getProfile } from "./../../actions/loginAction";
import { getLocalStorageData } from "./../../utils/utils";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  purple: {
    color: "#ffffff",
    backgroundColor: "#f50057",
  },
  header: {
    background: theme.background,
  },
}));

export default function Header({ path, history }) {
  const classes = useStyles();
  const { user, userLoggedIn } = useSelector((state) => state.userData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dispatch(profileLogout(user));
  };
  useEffect(() => {
    let token = getLocalStorageData("token");
    if (token) {
      dispatch(getProfile(token));
    } else {
      history.push("/");
    }
  }, [userLoggedIn]);
  return (
    <AppBar position="static" className={`${classes.header} color-white`}>
      {/* {!userLoggedIn && <Redirect to='/'/>} */}
      <Toolbar>
        <div color="inherit">
          {/* <MenuIcon /> */}
          <Avatar
            alt="Doctor App"
            className="img-responsive w-25"
            src="/heart.svg"
          />
          {/* {`${process.env.PUBLIC_URL}/images/image.png`} */}
          <div className="d-none">
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/free-icon/doctor_387561?term=doctor&page=1&position=13"
              title="Icon Pond"
            >
              Icon Pond
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              {" "}
              www.flaticon.com
            </a>
          </div>
          <div className="d-none">
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/free-icon/heart_684279?term=doctor&page=2&position=5"
              title="Good Ware"
            >
              Good Ware
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              {" "}
              www.flaticon.com
            </a>
          </div>
        </div>
        <Typography variant="h6" className={`${classes.title}`}>
          {/* {pathNameObject ? pathNameObject.title : ""} */}
        </Typography>
        {userLoggedIn && (
          <div className="d-flex align-item-center">
            <Typography variant="h6" className="pr-2" fontSize={20}>
              {user.initial}
              {user.name}
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              {/* <Avatar 
              className={`${classes.purple} text-uppercase font-18`} 
              border={1}
              boxShadow={3}>{user.name.slice(0, 1)}</Avatar> */}
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem component={RouterLink} to="/home">
                Search
              </MenuItem>
              <MenuItem component={RouterLink} to="/patient">
                Create New Entry
              </MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
