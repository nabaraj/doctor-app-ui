import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import {
  getPatientDetails,
  submitPrescription,
  editPrescription,
} from "../../actions/patientAction";
import { useSelector, useDispatch } from "react-redux";
import { calculate_age } from "./../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HistoryComponent from "./HistoryComponent";
import PrescriptionForm from "./PrescriptionForm";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function DisplayPatient(props) {
  const { patientDetails, prescription } = useSelector(
    (state) => state.patientData
  );
  // const { patientDetails } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userData);
  const [toggleHistory, setToggleHistory] = useState(false);
  const [presData, setPresData] = useState({});
  const classes = useStyles();
  const dispatch = useDispatch();
  let pathId = props.match.params.id;

  useEffect(() => {
    setPresData(prescription);
  }, [prescription]);
  const editHandler = (content) => {
    setPresData(content);
  };
  useEffect(() => {
    if (Object.keys(patientDetails).length === 0) {
      dispatch(getPatientDetails(pathId));
    } else if (patientDetails.patientId !== pathId) {
      dispatch(getPatientDetails(pathId));
    }
  }, []);

  const onExpanded = (e, expanded) => {
    console.log(e.target, expanded);
    setToggleHistory(expanded);
  };
  const submitForm = (formContent, editMode) => {
    let prescriptionData = {};
    if (editMode) {
      prescriptionData = {
        id: prescription._id,
        prescriptionContent: formContent,
        patientId: patientDetails._id,
        doctorId: user._id,
        date: new Date(),
      };
      dispatch(editPrescription(prescriptionData));
    } else {
      prescriptionData = {
        prescriptionContent: formContent,
        patientId: patientDetails._id,
        doctorId: user._id,
        date: new Date(),
      };
      dispatch(submitPrescription(prescriptionData));
    }
  };

  return (
    <div>
      <Header path={props.location.pathname} history={props.history} />

      <Container className="py-2" maxWidth="md">
        <div className="text-right">
          <IconButton onClick={() => window.print()}>
            <PrintOutlinedIcon></PrintOutlinedIcon>
          </IconButton>
        </div>
        <div className="doctorInfo d-none">
          <Typography component="h5">
            {user.initial} {user.name}
          </Typography>
          <Typography component="h6">{user.department}</Typography>
          <Typography component="h6">{user.department}</Typography>
        </div>
        <div className="doctorInfo d-none d-print-block">
          <div className="d-flex">
            <Typography variant="h6" component="span">
              {patientDetails.firstName} {patientDetails.lastName}
            </Typography>
            <div className="ml-auto">
              Gender: {patientDetails.gender || ""}
              Age:{" "}
              {isNaN(calculate_age(patientDetails.dob))
                ? ""
                : calculate_age(patientDetails.dob)}
            </div>
          </div>
        </div>
        {patientDetails.error ? (
          <Card>
            <Typography variant="h6" className="text-center">
              {patientDetails.error}
            </Typography>
          </Card>
        ) : (
          <div>
            <Card className="noPrint">
              <List>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item sm="6" xs="12">
                      Patient Name :{" "}
                      <Typography variant="h6" component="span">
                        {patientDetails.firstName} {patientDetails.lastName}
                      </Typography>
                    </Grid>
                    <Grid item sm="6" xs="12" className="text-right">
                      <div className="ml-auto">
                        {patientDetails.gender || ""}
                        {isNaN(calculate_age(patientDetails.dob))
                          ? ""
                          : calculate_age(patientDetails.dob)}
                      </div>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Card>
            <Card className="mt-3 noPrint">
              <Accordion onChange={onExpanded}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading} component="h6">
                    Show patient history
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {toggleHistory && (
                    <HistoryComponent
                      patientDetails={patientDetails}
                      doctorDetails={user}
                      editHandler={editHandler}
                    ></HistoryComponent>
                  )}
                </AccordionDetails>
              </Accordion>
            </Card>

            <PrescriptionForm
              submitForm={submitForm}
              prescription={presData}
            ></PrescriptionForm>
          </div>
        )}
      </Container>
    </div>
  );
}
