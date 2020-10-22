import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  submit: {
    color: "#ffffff",
  },
}));

export default function PrescriptionForm() {
  const classes = useStyles();
  const [toggleContent, setToggle] = useState(false);
  const [presObject, setPres] = useState({
    symptoms: "Symptoms content",
    testReq: "Test Content",
    medication: "Medication Content",
  });
  const handleChange = (event) => {
    setToggle(event.target.checked);
  };
  const changeField = (name, content) => {
    let presData = { ...presObject, [name]: content };
    setPres(presData);
  };
  const rteChange = (content, delta, source, editor, name) => {
    console.log(editor.getHTML()); // rich text
    console.log(editor.getText()); // plain text
    console.log(editor.getLength()); // number of characters
    console.log(name);
    changeField(name, editor.getHTML());
  };
  const createMarkup = (content) => {
    return { __html: content };
  };
  return (
    <form>
      <FormControlLabel
        className="px-3"
        control={
          <Switch
            checked={toggleContent}
            onChange={handleChange}
            name="checkedA"
            size="small"
            inputProps={{ "aria-label": "secondary checkbox" }}
            color="primary"
          ></Switch>
        }
        label="Show editor"
      ></FormControlLabel>
      <Grid container spacing="3" className="p-3">
        <Grid item xs="12">
        <label>Symptoms</label>
          {!toggleContent ? (
            <div dangerouslySetInnerHTML={createMarkup(presObject.symptoms)}/>
          ) : (
            <Fragment>
            
            <ReactQuill
              theme="snow"
              value={presObject.symptoms}
              onChange={(content, delta, source, editor) =>
                rteChange(content, delta, source, editor, "symptoms")
              }
            />
            </Fragment>
          )}
        </Grid>

        <Grid item xs="12">
        <label>Test</label>
          {!toggleContent ? (
            <div dangerouslySetInnerHTML={createMarkup(presObject.testReq)}/>
          ) : (
            <Fragment>
            
            <ReactQuill
              theme="snow"
              value={presObject.testReq}
              onChange={(content, delta, source, editor) =>
                rteChange(content, delta, source, editor, "testReq")
              }
            /></Fragment>
          )}
        </Grid>
        <Grid item xs="12">
        <label>Medication</label>
          {!toggleContent ? (
            <div dangerouslySetInnerHTML={createMarkup(presObject.medication)}/>
          ) : (
            <Fragment>
              
              <ReactQuill
                theme="snow"
                value={presObject.medication}
                onChange={(content, delta, source, editor) =>
                  rteChange(content, delta, source, editor, "medication")
                }
              />
            </Fragment>
          )}
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
