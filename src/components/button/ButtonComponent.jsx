import { Button } from '@material-ui/core'
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  
  CustomButton:{

    background:theme.background,
    color:'white'
  }
}));
export default function ButtonComponent(props) {
  const classes = useStyles();
  let newProps = {...props};
  // console.log("newProps ", newProps.disabled);
  if(newProps.variant==='contained' && !newProps.disabled){
    newProps.className = `${newProps.className} ${classes.CustomButton}`;
  }
  
  return (
    <Button {...newProps}>{props.children}</Button>
  )
}
