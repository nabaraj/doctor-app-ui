import React,{useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {getPatientHistory} from "./../../actions/patientAction";

export default function HistoryComponent({patientDetails, doctorDetails}) {
  const { patientHistory } = useSelector((state) => state.patientData);
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log('mounted');
    if(patientHistory===null){
      dispatch(getPatientHistory(patientDetails.patientId, doctorDetails._id))
    }
  },[])
  return (
    <div>
      History content
    </div>
  )
}
