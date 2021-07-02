import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import stopData from "../data/Data.json";
import React, {useState} from 'react';


const Fares_dropdown = () => {

    return (
    <select>
    <h1>hello</h1>
    {stopData.map((stopdetail, index)=>{

    return <option>{stopdetail.stop_name}</option>
    })}
    </select>
    )
}

export default Fares_dropdown