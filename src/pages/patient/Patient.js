import { Input, TextField } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import Header from "./../../components/header/Header";
import { Container, Grid, Button } from "@material-ui/core";


export default class Patient extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedDate: new Date('2014-08-18T21:11:54')
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  handleDateChange(e){
    console.log("date ",e.target.value);
    this.setState({
      selectedDate:e.target.value
    })
  };

  render() {
    return (
      <div>
        <Header path={this.props.location.pathname} />
        <Container className="py-4" maxWidth="md">
          <Grid container spacing={3} alignItems="center">
            <Grid item sm="6" xs="12">
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
              />
            </Grid>
            <Grid item sm="6" xs="12">
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
              />
            </Grid>
            <Grid item sm="6" xs="12">
              <TextField
                id="email"
                name="email"
                label="Email"
                fullWidth
                type="email"
              />
            </Grid>
            
              <Grid item sm="6" xs="12">
              <TextField
        id="date"
        label="Birthday"
        className="fullWidth"
        type="date"
        defaultValue="2017-05-24"
        value={this.state.selectedDate}
        onChange = {this.handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
              </Grid>
            
          </Grid>
        </Container>
      </div>
    );
  }
}
