import { TextField, Paper, Grid, Divider, CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import "./autocomplete.scss";
var debounce = require('lodash.debounce');
export default class Autocomplete extends Component {
  constructor(props){
    super(props);
    this.state={
      searchInput:""
    }
    this.changeInput = this.changeInput.bind(this);
    this.searchPatient = this.searchPatient.bind(this);
    this.searchDebounce = this.searchDebounce.bind(this);
  }
  changeInput(e){
    let value = e.target.value;
    this.setState({
      searchInput:value
    }, ()=>{

    
    if(value.length > 3){
      // console.log(value);
      this.searchPatient()
    }
  })
  }
  searchPatient(event) {
    this.searchDebounce();
  }

  searchDebounce = debounce(function () {
    // console.log(this.state.searchInput)
    this.props.searchPatientEvent(10, this.state.searchInput, 1)
  }, 500);
  render() {
    return (
      <div className="fullWidth">
        {/* <TextField 
          id="outlined-basic" 
          label="Outlined" 
          variant="outlined" 
          className='fullWidth' 
          error={true}
          /> */}

        {/* <Paper component="form" className="px-2"> */}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="pos-relative"
        >
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Search Patient"
              variant="outlined"
              className="fullWidth searchInput"
              onChange={this.changeInput}
              value={this.searchInput}
            />
          </Grid>
          {this.props.searchLoading && <div className="pos-absolute searchButton pr-3">
            <CircularProgress style={{width:"20px", height:"20px"}}></CircularProgress>
          </div>}
          
        </Grid>
        {/* </Paper> */}
      </div>
    );
  }
}
