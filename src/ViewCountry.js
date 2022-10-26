import React from "react";

export default function ViewCountry(props){
    return <div id="viewCountry" className="side-padding row splitItems bg-col">
        <div className="img-container">
            <img className="shadow" src={props.data.flags.png}/>
        </div>
        <div className="country-detailed">
            <h1>{props.data.name.common}</h1>
            <div className="row">
                <div>
                    <p><strong>Native Name: </strong>{Object.keys(props.data.name.nativeName).map(x => props.data.name.nativeName[x].common).join(", ")}</p>
                    <p><strong>Population </strong>{props.data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}</p>
                    <p><strong>Region: </strong>{props.data.region}</p>
                    <p><strong>Sub Region: </strong>{props.data.subregion}</p>
                    <p><strong>Capital: </strong>{props.data.capital != null ? props.data.capital.join(", ") : "-"}</p>
                </div>
                <div>
                    <p><strong>Top Level Domain: </strong>{props.data.tld.join(", ")}</p>
                    <p><strong>Currencies: </strong>{Object.keys(props.data.currencies).map(x => props.data.currencies[x].name).join(", ")}</p>
                    <p><strong>Languages: </strong>{Object.keys(props.data.languages).map(x => props.data.languages[x]).join(", ")}</p>
                </div>
            </div>
            <p><strong>Border Countries: </strong>{props.data.borders ? props.data.borders.map((x, i) => <span key={i} className="bg-col-2 shadow border-rad hover-pointer" onClick={() => props.focus(x.cca3)}>{x.name.common} </span>) : "None"}</p>
        </div>
    </div>
}