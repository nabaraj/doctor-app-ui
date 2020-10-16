import { TextField, Paper, Grid, Divider } from "@material-ui/core";
import React, { Component } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import "./autocomplete.scss";

export default class Autocomplete extends Component {
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
            />
          </Grid>
          <div className="pos-absolute searchButton">
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
        </Grid>
        {/* </Paper> */}
      </div>
    );
  }
}
