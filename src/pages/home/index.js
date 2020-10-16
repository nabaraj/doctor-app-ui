import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "./../../components/header/Header";
import { getLocalStorageData } from "./../../utils/utils";
import { getProfile } from "./../../actions/loginAction";
import { bindActionCreators } from "redux";
import {
  Container,
  Grid,
  Button,
} from "@material-ui/core";
import Autocomplete from "../../components/autocomplete/Autocomplete";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  loadImage() {
    let randomNumber = Math.floor(Math.random() * 999) + 1;
    // https://picsum.photos/200/300
    let dummysrc = `https://picsum.photos/${randomNumber}/1200/400.jpg`;
    // setHeaderBg(dummysrc);
    return dummysrc;
  }
  componentDidMount() {
    let token = getLocalStorageData("token");
    if (this.props.user.userLoggedIn) {
      this.setState({
        isLoggedIn: this.props.user.userLoggedIn,
      });
    } else {
      if (token) {
        console.log(token);
        // checkProfile
        this.props.getProfile(token);
      } else {
        // if (!this.props.user.userLoggedIn) {
        this.props.history.push("/");
        // }
      }
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.user.userLoggedIn) {
      return <Redirect to="/" />;
    } else return null;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user.userLoggedIn !== this.props.user.userLoggedIn) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div>
        <Header path="/home" history={this.props.history} />
        <Container className="py-4" maxWidth="md">
          <Grid container spacing={3} alignItems="center">
            <Grid xs="9">
              <Autocomplete />
            </Grid>
            <Grid xs="3" className="text-right">
              <Button  href="/patient" size="large">Add new entry</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProfile: getProfile,
    },
    dispatch
  );
}
function mapStateToProps(state) {
  return {
    user: state.userData,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
