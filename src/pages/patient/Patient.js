import {
  Accordion,
  CircularProgress,
  TextField,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { Component } from "react";
import Header from "./../../components/header/Header";
import { Container, Grid, Button } from "@material-ui/core";
import {patientRegistration, clearPatientDetails} from "./../../actions/patientAction";
import { connect } from "react-redux";
import { bindActionCreators, dispatch } from "redux";
import {validateEmail} from "./../../utils/utils";
import MenuItem from '@material-ui/core/MenuItem';

class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedOptional: false,
      loadingForm: false,
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nationality: "",
        dob: "",
        insurance: '',
        address: "",
        image: "",
        gender: "",
        height: ""      },
      genderOption:[{
        value:"M",
        label:"Male"
      },{
        value:"F",
        label:"Female"
      }]
    };
    this.handleChange = this.handleChange.bind(this);
    this.patientRegistration = this.patientRegistration.bind(this);
  }

  componentDidMount(){
    this.props.clearPatientDetails();
  }
  
  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    let setFormData = {...this.state.formData, [name]:value};
    this.setState({
      formData:setFormData,
    });
  }
  patientRegistration(e){
    e.preventDefault();
    let setFormData = {...this.state.formData,  'doctorId':this.props.user._id};
    this.setState({
      loadingForm:true,
      formData:setFormData
    },()=> {
      
      this.props.patientRegistration(this.state.formData)})
  }
  componentDidUpdate(prevProps){
    
    if(Object.keys(this.props.patientData).length>0){
      this.setState({
      loadingForm:false
    })

      this.props.history.push("/patient/"+this.props.patientData._id)
    }
  }
  render() {
    let{firstName,
      lastName,
      email,
      phone,
      nationality,
      insurance,
      address,
      gender,
      height}=this.state.formData;
    return (
      <div>
        <Header path={this.props.location.pathname} />
        <Container className="py-4" maxWidth="md">
        <Card className="p-3">
            <form onSubmit={this.patientRegistration}>
              <Grid container spacing={3} alignItems="center">
                <Grid item sm="6" xs="12">
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value = {firstName}
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item sm="6" xs="12">
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={lastName}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item sm="4" xs="12">
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    type="email"
                    value={email}
                    error={email!=='' && !validateEmail(email)}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item sm="4" xs="12">
                  <TextField
                    id="gender"
                    name="gender"
                    label="Gender"
                    select
                    fullWidth
                    value={gender}
                    onChange={this.handleChange}
                  >
                    this.state.genderOption
                    {this.state.genderOption.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
                  </TextField>
                </Grid>

                <Grid item sm="4" xs="12">
                  <TextField
                    id="dob"
                    name="dob"
                    label="Birthday"
                    className="fullWidth"
                    type="date"
                    value={this.state.dob}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item sm="6" xs="12">
                  <TextField
                    id="phone"
                    name="phone"
                    label="Phone no"
                    fullWidth
                    type="tel"
                    value={phone}
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item sm="6" xs="12">
                  <TextField
                    id="nationality"
                    name="nationality"
                    label="Nationality"
                    fullWidth
                    type="text"
                    value={nationality}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid xs="12">
                  <Accordion className="boxShadow-none">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Optional Fields</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Grid item xs="6">
                          <TextField
                            id="address"
                            name="address"
                            label="Address"
                            fullWidth
                            value={address}
                            multiline
                            onChange={this.handleChange}
                          />
                        </Grid>
                        <Grid item xs="6">
                          <TextField
                            id="insurance"
                            name="insurance"
                            label="Insurance"
                            value={insurance}
                            fullWidth
                            onChange={this.handleChange}
                          />
                        </Grid>
                        <Grid item xs="6">
                          <TextField
                            id="height"
                            name="height"
                            label="Height"
                            value={height}
                            fullWidth
                            onChange={this.handleChange}
                          />
                        </Grid>
                        {/* <Grid item xs="6">
                    <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    style={{ display: "none" }}
  />
</Button>
                    </Grid> */}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid xs="12" className="pt-3 text-center" >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    className="w-75"
                    disabled={(!firstName && !lastName)|| this.state.loadingForm}
                  >
                    Submit Details
                    {this.state.loadingForm && (
                      <div className="pl-2 w-15 d-flex justify-content-center">
                        <CircularProgress
                          color="secondary"
                          className="w-15"
                          size="20"
                        />
                      </div>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      patientRegistration: patientRegistration,
      clearPatientDetails: clearPatientDetails
    },
    dispatch
  );
}
function mapStateToProps(state) {
  return {
    patientData: state.patientData.patientDetails,
    user: state.userData.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient)