import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { getPatientDetails } from "../../actions/patientAction";
import { useSelector, useDispatch } from "react-redux";
import { calculate_age } from "./../../utils/utils";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HistoryComponent from "./HistoryComponent";
import PrescriptionForm from "./PrescriptionForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function DisplayPatient(props) {
  const { patientDetails } = useSelector((state) => state.patientData);
  const {user} = useSelector((state) => state.userData);
  const [toggleHistory, setToggleHistory] = useState(false)
  const classes = useStyles();
  const dispatch = useDispatch();
  let pathId = props.match.params.id;
  useEffect(() => {
    if (Object.keys(patientDetails).length === 0) {
      dispatch(getPatientDetails(pathId));
    } else if (patientDetails.patientId !== pathId) {
      dispatch(getPatientDetails(pathId));
    }
  }, []);

  const onExpanded =(e, expanded)=>{
    console.log(e.target, expanded);
    setToggleHistory(expanded)
  }

  return (
    <div>
      <Header path={props.location.pathname} history={props.history} />
      <Container className="py-4" maxWidth="md">
        {patientDetails.error ? (
          <Card>
            <Typography variant="h6" className="text-center">
              {patientDetails.error}
            </Typography>
          </Card>
        ) : (
          <div>
            <Card>
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
            <Card className="mt-3">
              <Accordion onChange={onExpanded}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Show patient history
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {toggleHistory && 
                    <HistoryComponent 
                    patientDetails = {patientDetails}
                    doctorDetails = {user}
                    ></HistoryComponent>}
                </AccordionDetails>
              </Accordion>
            </Card>
            <Card className="mt-3">
              <PrescriptionForm></PrescriptionForm>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
}
