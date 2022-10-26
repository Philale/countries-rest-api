import React from "react";
import Country from "./Country";

export default function Countries(props){

    return <div id="countries" className="side-padding bg-col-1 wrap">
        {props.countries.map((country, i) => <Country key={i} focus={props.focus} data={country}/>)}
    </div>
}