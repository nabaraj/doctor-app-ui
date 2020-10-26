import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  Card,
} from "@material-ui/core";
import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ButtonComponent from "./../../components/button/ButtonComponent";
import {createMarkup} from "./../../utils/utils";

const useStyles = makeStyles((theme) => ({
  submit: {
    color: "#ffffff",
  },
  editorArea: {
    minHeight: "200px",
  },
}));

export default function PrescriptionForm({ submitForm, prescription }) {
  const classes = useStyles();
  const [toggleContent, setToggle] = useState(false);
  const [oldContent, setOldContent] = useState("");
  const [switchLabel, setSwithLabel] = useState("Show editor");
  const [editToggle, setEditToggle] = useState(false);
  const [presObject, setPres] = useState({
    symptoms: "",
    testReq: "Test Content",
    medication: "Medication Content",
    prescriptionContent: "",
  });
  const handleChange = (event) => {
    setToggle(event.target.checked);
  };
  const changeField = (name, content) => {
    let presData = { ...presObject, [name]: content };
    setPres(presData);
  };
  const rteChange = (content, delta, source, editor, name) => {
    // console.log(editor.getHTML()); // rich text
    // console.log(editor.getText()); // plain text
    // console.log(editor.getLength()); // number of characters
    // console.log(name);
    let editorHtml = editor.getHTML() === "<p><br></p>" ? "" : editor.getHTML();
    changeField(name, editorHtml);
  };
  
  useEffect(() => {
    if (Object.keys(prescription).length > 0 ){
     if (prescription.pc !== oldContent) {
      let presObj = { ...presObject };
      presObj.prescriptionContent = prescription.pc;
      setPres({ ...presObj });
      setToggle(false);
      setEditToggle(true);
      setOldContent(prescription.pc)
      setSwithLabel("Edit Prescription");
    }}
  }, [prescription]);
  return (
    <form>
      <Grid container spacing="3" className="p-3">
        <Grid item xs="12">
          {!toggleContent && (
            <div
              dangerouslySetInnerHTML={createMarkup(
                presObject.prescriptionContent
              )}
            />
          )}
        </Grid>
      </Grid>

      <FormControlLabel
        className="px-3 noPrint"
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
        label={switchLabel}
      ></FormControlLabel>
      <Grid container spacing="3" className="p-3">
        <Grid item xs="12" className="noPrint">
          <label>Prescription</label>
          {!toggleContent ? (
            ""
          ) : (
            <Fragment>
              <ReactQuill
                theme="snow"
                value={presObject.prescriptionContent}
                onChange={(content, delta, source, editor) =>
                  rteChange(
                    content,
                    delta,
                    source,
                    editor,
                    "prescriptionContent"
                  )
                }
              ></ReactQuill>
              <p></p>
              <ButtonComponent
                variant="contained"
                color="primary"
                onClick={() => submitForm(presObject.prescriptionContent, editToggle)}
                disabled={!presObject.prescriptionContent}
              >
                Submit Prescription
              </ButtonComponent>
            </Fragment>
          )}
        </Grid>
      </Grid>
    </form>
  );
}
