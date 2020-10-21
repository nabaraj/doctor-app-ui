import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
 submit:{
   color:"#ffffff"
 }
}));

export default function PrescriptionForm() {
  const classes = useStyles();
  return (
    <form>
    <Grid container spacing="3" className="p-3">
      <Grid item xs="12">
        <TextField
          required
          id="symptoms"
          name="symptoms"
          label="Symptoms"
          fullWidth
          defaultValue=""
          multiline
          variant="outlined"
          rows={4}
        />
      </Grid>
      <Grid item xs="12">
        <TextField 
        id="test" 
        name="test" 
        multiline
        rows={4}
        variant="outlined"
        fullWidth label="Test" />
      </Grid>
      <Grid item xs="12">
        <TextField
          id="medication"
          name="medication"
          fullWidth
          label="Medication"
          multiline
          rows={4}
          variant="outlined"
        />
      </Grid>
      <Grid item xs="12" className="text-center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`${classes.submit} w-50`}

          // disabled={(!account.userName && !account.password) || loginLoading}
        >
          Submit
          {/* {loginLoading && <div className="pl-2 w-15 d-flex justify-content-center">
                      <CircularProgress color="secondary" className="w-75" size="20"/>
                    </div>} */}
        </Button>
      </Grid>
    </Grid>
    </form>
  );
}
