import React from "react";

export default function Search(props) {
    return <div id="search" className="side-padding row centerItems bg-col-1">
        { props.viewingCountry ? <button className="bg-col-2 txt-col shadow border-rad hover-scale" onClick={() => props.focus(null)}>Back</button> : <form className="row splitItems wrap" onSubmit={(e) => {
            e.preventDefault();
            let value = document.getElementById("search-country").value;
            value == "" ? props.search("all") : props.search("name/" + value);
            return false;
        }}>
            <input id="search-country" className="bg-col-2 shadow border-rad" type="text" placeholder="Search for a country..."/>
            <select className="bg-col-2 shadow border-rad txt-col" onChange={(event) => props.filter(event.target.value)}>
                <option value="">All Regions</option>
                <option>Africa</option>
                <option value="Americas">America</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Oceania</option>
            </select>
        </form>}
    </div>
}