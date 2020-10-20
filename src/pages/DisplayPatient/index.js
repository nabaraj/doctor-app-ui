import {
  Card,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import { patientDetails } from "../../actions/patientAction";
import { useSelector, useDispatch } from "react-redux";
import { calculate_age } from "./../../utils/utils";

export default function DisplayPatient(props) {
  const { patientDetials } = useSelector((state) => state.patientData);
  const dispatch = useDispatch();
  let pathId = props.match.params.id;
  useEffect(() => {
    if (Object.keys(patientDetails).length === 0) {
      dispatch(patientDetails(pathId));
    } else if (patientDetails.patientId !== pathId) {
      dispatch(patientDetails(pathId));
    }
  }, []);
  return (
    <div>
      <Header path={props.location.pathname} />
      <Container className="py-4" maxWidth="md">
        <Card>
          {patientDetials.error ? (
            <Typography variant="h6" className="text-center">
              {patientDetials.error}
            </Typography>
          ) : (
            <div>
              <List>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item sm="6" xs="12">
                      Patient Name :{" "}
                      <Typography variant="h6" component="span">
                        {patientDetials.firstName} {patientDetials.lastName}
                      </Typography>
                    </Grid>
                    <Grid item sm="6" xs="12" className="text-right">
                      <div className="ml-auto">
                        Age:{" "}
                        {isNaN(calculate_age(patientDetials.dob))
                          ? ""
                          : calculate_age(patientDetials.dob)}
                      </div>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
}
