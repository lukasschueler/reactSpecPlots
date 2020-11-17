import React from 'react';
import Button from '@material-ui/core/Button'

var buttonStyle = {
    margin: '10px 10px 10px 0',
    borderWidth: "5px",
    border: "grey"
  };


const CustomButton = () => {
    return  (
    <Button
        className = 'CustomButton'
        style = {buttonStyle}>
        You can click here!
    </Button>
    )};

export default CustomButton;