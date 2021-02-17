import React from 'react';
import { TextField } from '@material-ui/core';


const custominput = (props) => {
    return (
        <TextField 
        id = {props.id}
        className = "TextInput" 
        variant = "outlined"
        label = {props.label}
        onChange = {props.changer}
        color = "secondary"
        defaultValue = {props.default}
        />
    )
}

export default custominput;