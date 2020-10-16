import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import Header from "../../components/header/Header";

export default function Registration(props) {
  return (
    <div>
      <Header path={props.location.pathname} redirect={false} />
      <Container fixed>
        <Typography variant="h6">
          Registration
        </Typography>
      </Container>
    </div>
  );
}
