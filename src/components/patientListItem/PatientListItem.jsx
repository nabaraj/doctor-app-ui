import React from "react";
import { ListItemText, List, ListItemAvatar, ListItem, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  
  gradientBg:{
    background:theme.background
  }
}));
export default function PatientListItem({item}) {
  const classes = useStyles();
  const {firstName, lastName, patientId} = item
  return (
      <ListItem>
        <ListItemAvatar>
          <Avatar variant="rounded" className={classes.gradientBg}>
            {firstName.slice(0,1)}{lastName.slice(0,1)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={firstName} secondary={lastName} />
      </ListItem>
  );
}
