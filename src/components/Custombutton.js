import React from 'react';
import Button from '@material-ui/core/Button'

var buttonStyle = {
    margin: '10px 10px 10px 0',
    borderWidth: "5px",
    border: "grey"
  };


const CustomButton = (props) => {


    // style = {buttonStyle}>
    return  (
    <Button variant = "contained"  
            color = "secondary" 
            size = "large" 
            value = {props.value}
            onClick = {props.changer}>
    </Button>
    )};

export default CustomButton;