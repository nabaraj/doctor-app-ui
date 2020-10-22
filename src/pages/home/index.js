import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "./../../components/header/Header";
import { getLocalStorageData } from "./../../utils/utils";
import { getProfile } from "./../../actions/loginAction";
import { bindActionCreators } from "redux";
import { Container, Grid, Button, Typography, Card } from "@material-ui/core";
import Autocomplete from "../../components/autocomplete/Autocomplete";
import { searchPatient } from "./../../actions/patientAction";
import { Link as RouterLink } from 'react-router-dom';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.searchPatientEvent = this.searchPatientEvent.bind(this);
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
  searchPatientEvent(pageSize, str, nextPage) {
    this.props.searchPatient(pageSize, str, nextPage);
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.user.userLoggedIn !== this.props.user.userLoggedIn) {
  //     this.props.history.push("/");
  //   }
  // }
  render() {
    let { serchData } = this.props.patientData;
    return (
      <div>
        <Header path="/home" history={this.props.history} />
        <Container className="py-4" maxWidth="md">
          <Grid container spacing={3} alignItems="center">
            <Grid item sm="9" xs="12">
              <Autocomplete 
                searchPatientEvent={this.searchPatientEvent} 
                searchLoading={this.props.patientData.searchLoading}
              />
            </Grid>
            <Grid item sm="3" xs="12" className="text-right">
              <Button
                to="/patient"
                size="large"
                className="fullWidth"
                color="primary"
                component={RouterLink}
              >
                Add new entry
              </Button>
            </Grid>
            <Grid item xs="12"></Grid>

            {serchData.results &&
              serchData.results.map((item, index) => (
                <Grid  key={item._id} item sm="4" xs="12">
                  <RouterLink to={`/patient/${item._id}`}>
                    <Card className="p-3">
                      <Typography>{item.firstName} {item.lastName}</Typography>
                      <Typography>{item.patientId}</Typography>
                    </Card>
                  </RouterLink>
                </Grid>
              ))}
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
      searchPatient: searchPatient,
    },
    dispatch
  );
}
function mapStateToProps(state) {
  return {
    user: state.userData,
    patientData: state.patientData,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
