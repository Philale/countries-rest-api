import React from "react";

export default function Country(props){
    return <div className="country border-rad bg-col-2 shadow hover-pointer hover-scale" onClick={() => props.focus(props.data.cca3)}>
        <img className="shadow" src={props.data.flags.png}/>
        <div className="country-summary">
            <h2>{props.data.name.common}</h2>
            <p><strong>Population: </strong>{props.data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}</p>
            <p><strong>Region: </strong>{props.data.region}</p>
            <p><strong>Capital: </strong>{props.data.capital != null ? props.data.capital.join(", ") : "-"}</p>
        </div>
    </div>
}