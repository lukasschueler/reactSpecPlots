import React from 'react';


const custominput = (props) => {
    return (
        <input className = "Changer" type="text" value = {props.content} onChange = {props.changer} />
    )
}

export default custominput;