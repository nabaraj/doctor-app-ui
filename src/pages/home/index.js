import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "./../../components/header/Header";
import { getLocalStorageData } from "./../../utils/utils";
import { getProfile } from "./../../actions/loginAction";
import { bindActionCreators } from "redux";
import { Container, Grid, Button, CircularProgress, Typography } from "@material-ui/core";
import Autocomplete from "../../components/autocomplete/Autocomplete";
import { searchPatient, loadMore } from "./../../actions/patientAction";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PatientTable from "../../components/patientTable/PatientTable";
import "./home.scss";
import ButtonComponent from "../../components/button/ButtonComponent";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      pageSize: 3,
      nextPage: 1,
      searchStr: "",
      headData: [
        {
          key: "firstName",
          label: "First Name",
        },
        {
          key: "lastName",
          label: "Last Name",
        },
        {
          key: "patientId",
          label: "ID",
          className: "linkItem",
        },
        {
          key: "lastVisit",
          label: "Last Visit",
          className: "linkItem",
          type:"date"
        },
      ],
    };
    this.searchPatientEvent = this.searchPatientEvent.bind(this);
    this.patientPage = this.patientPage.bind(this);
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
  searchPatientEvent(str) {
    this.setState(
      {
        searchStr: str,
      },
      () => {
        this.props.searchPatient(this.state.pageSize, str, this.state.nextPage);
      }
    );
  }
  patientPage(patientId) {
    this.props.history.push(`/patient/${patientId}`);
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.user.userLoggedIn !== this.props.user.userLoggedIn) {
  //     this.props.history.push("/");
  //   }
  // }
  render() {
    let { searchData, loadMoreLoading } = this.props.patientData;
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
              <ButtonComponent
                to="/patient"
                size="large"
                className="fullWidth"
                color="primary"
                component={RouterLink}
                variant="outlined"
              >
                Add new entry
              </ButtonComponent>
            </Grid>
            <Grid item xs="12" className="text-right">
              {searchData && (
                <Button
                  variant="outlined"
                  // variant="contained"
                  onClick={() =>
                    this.props.loadMore(
                      this.state.pageSize,
                      this.state.searchStr,
                      searchData.nextLink
                    )
                  }
                  color="primary"
                  disabled={loadMoreLoading || !searchData.nextLink}
                >
                  load more
                  {loadMoreLoading ? (
                    <CircularProgress
                      style={{ width: "20px", height: "20px" }}
                    ></CircularProgress>
                  ) : (
                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                  )}
                </Button>
              )}
            </Grid>

            {/* {serchData.results && <List className="patientList">
              {serchData.results.map((item, index) => (
               
                <PatientListItem key={item.patientId} item={item}></PatientListItem>
              ))}
              </List>} */}
            {searchData.results && searchData.results.length>0 ? (
              <PatientTable
                headData={this.state.headData}
                bodyData={searchData.results}
                patientPage={this.patientPage}
              ></PatientTable>):
              (<Grid item xs="12"><Typography className="text-center">No results found</Typography></Grid>
            )}
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
      loadMore: loadMore,
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
