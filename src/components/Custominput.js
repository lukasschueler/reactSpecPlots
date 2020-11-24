import React from 'react';
import { TextField } from '@material-ui/core';


const custominput = (props) => {
    return (
        <TextField 
        className = "TextInput" 
        variant = "outlined"
        label = {props.label}
        onChange = {props.changer}
        color = "secondary"
        />
    )
}

export default custominput;