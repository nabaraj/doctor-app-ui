import {
  CircularProgress,
  Typography,
  Grid,
  Chip,
  Card,
  CardContent,
  Dialog,
  Avatar,
  DialogContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPatientHistory } from "./../../actions/patientAction";
import { createMarkup } from "./../../utils/utils";
import { convertDate } from "./../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function HistoryComponent({ patientDetails, doctorDetails }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dialogContent, setContent] = useState("");

  const { patientHistory, historyLoading } = useSelector(
    (state) => state.patientData
  );
  const dispatch = useDispatch();

  const handleDialogOpen = function (index) {
    let content = patientHistory[index].pc;
    setContent(content);
    setOpen(true);
  };
  const handleClose = function () {
    setOpen(false);
  };
  useEffect(() => {
    if (patientHistory === null) {
      dispatch(getPatientHistory(patientDetails._id, doctorDetails._id));
    }
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {historyLoading && (
        <div className="text-center">
          <CircularProgress
            style={{ width: "20px", height: "20px" }}
          ></CircularProgress>
          <Typography>Loading History</Typography>
        </div>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <div dangerouslySetInnerHTML={createMarkup(dialogContent)}></div>
        </DialogContent>
      </Dialog>
      {patientHistory && (
        <div className={classes.root}>
          {patientHistory.map((item, index) => {
            return (
              <Chip
                onClick={() => handleDialogOpen(index)}
                key={item.date + index}
                label={convertDate(item.date)}
                variant="outlined"
                color="primary"
                size="small"
              ></Chip>
            );
          })}
        </div>
      )}
    </div>
  );
}
