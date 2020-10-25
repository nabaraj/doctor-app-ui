import React from 'react'
import {Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom';
import "./patientTable.scss";


const addLink = (linkText,id, content)=>{
  return (<Link 
            className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary" 
            to={`${linkText}${id}`}>
            {content}
          </Link>)
}
const renderTableRow = (bodyData, headData, patientPage)=>{
  return bodyData.map((rowItem, index)=>{
           return (<TableRow key={index}>
            {headData.map((item)=>(
              <TableCell className={`${item.className ? item.className:""}`} onClick={()=>patientPage(rowItem._id)}>
                {/* {item.key==='firstName'?<Avatar>{rowItem['firstName'].slice(0,1)}</Avatar>:""} */}
                {item.linkString ? addLink(item.linkString, rowItem._id, rowItem[item.key]):
                rowItem[item.key]}
              </TableCell>
            ))}
          </TableRow>)
          })         
} 

export default function PatientTable({headData, bodyData, patientPage}) {

  return (
    // <div style={{ height: 400, width: '100%' }}>
    //   <DataGrid rows={rows} columns={columns} pageSize={5} />
    // </div>
    <TableContainer>
      <Table className="table-hover">
        <TableHead>
          <TableRow>
            {headData.map((item, index)=>{
              return <TableCell key={index}>{item.label}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
            {renderTableRow(bodyData, headData, patientPage)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
