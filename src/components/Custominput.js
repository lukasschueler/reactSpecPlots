import React from 'react';
import { TextField } from '@material-ui/core';


const custominput = (props) => {
    return (
        <TextField 
        className = "TextInput" 
        variant = "filled"
        label = {props.label}
        onChange = {props.changer}
        />
    )
}

export default custominput;