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
    <button onClick = {props.changer}>
        You can click here!
    </button>
    )};

export default CustomButton;