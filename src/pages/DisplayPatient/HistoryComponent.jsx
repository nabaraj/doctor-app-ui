import {
  CircularProgress,
  Typography,
  Card,
  Dialog,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPatientHistory } from "./../../actions/patientAction";
import { createMarkup } from "./../../utils/utils";
import { convertDate } from "./../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import CachedIcon from "@material-ui/icons/Cached";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    marginTop: "-9px",
    marginRight: "-8px",
  },
}));

export default function HistoryComponent({
  patientDetails,
  doctorDetails,
  editHandler,
}) {
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
  const handleEdit = function (index) {
    let content = patientHistory[index];
    editHandler(content);
  };
  const handleClose = function () {
    setOpen(false);
  };
  useEffect(() => {
    if (patientHistory === null) {
      dispatch(getPatientHistory(patientDetails._id, doctorDetails._id));
    }
  }, []);
  const reloadResult = () => {
    dispatch(getPatientHistory(patientDetails._id, doctorDetails._id));
  };
  return (
    <div style={{ width: "100%" }}>
      <div className="fullWidth text-right mt-n4">
        <Tooltip
          title="Reload Result"
          className={classes.tooltip}
          placement="bottom"
        >
          <IconButton
            component="span"
            onClick={() => reloadResult()}
            className="boxShadowNone"
            size="small"
          >
            <CachedIcon fontSize="small" color="primary"></CachedIcon>
          </IconButton>
        </Tooltip>
      </div>
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
        <IconButton
          size="small"
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseOutlinedIcon fontSize="small" />
        </IconButton>
        <DialogContent dividers>
          <div dangerouslySetInnerHTML={createMarkup(dialogContent)}></div>
        </DialogContent>
      </Dialog>
      {!historyLoading && patientHistory && (
        <div className={classes.root}>
          {patientHistory.map((item, index) => {
            return (
              <Card key={item.date + index} className="p-2 text-center">
                <Typography
                  color="textSecondary"
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {convertDate(item.date)}
                </Typography>
                <div class="d-flex justify-content-space-between">
                  <Tooltip
                    title="Edit"
                    className={classes.tooltip}
                    placement="bottom"
                  >
                    <IconButton
                      component="span"
                      onClick={() => handleEdit(index)}
                      className="boxShadowNone"
                      size="small"
                    >
                      <CreateOutlinedIcon
                        fontSize="small"
                        color="disabled"
                      ></CreateOutlinedIcon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="View"
                    className={classes.tooltip}
                    placement="bottom"
                  >
                    <IconButton
                      component="span"
                      className="boxShadowNone"
                      size="small"
                      onClick={() => handleDialogOpen(index)}
                    >
                      <VisibilityOutlinedIcon
                        fontSize="small"
                        color="disabled"
                      ></VisibilityOutlinedIcon>
                    </IconButton>
                  </Tooltip>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
