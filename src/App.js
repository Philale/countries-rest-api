import React from "react";
import Countries from "./Countries";
import Navbar from "./Navbar";
import Search from "./Search";
import ViewCountry from "./ViewCountry";

export default class App extends React.Component{
    constructor(){
        super();

        this.state = {
            results: [],
            filteredResults: [],
            filter: null,
            viewCountry: null
        };
        this.makeRequestNecessary = this.makeRequestNecessary.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.focusCountryAndRequest = this.focusCountryAndRequest.bind(this);
    }

    componentDidMount(){
        this.makeRequestNecessary("all");
    }

    //Request for main page, only get necessary information
    makeRequestNecessary(to){
        console.log("https://restcountries.com/v3.1/" + to + "?fields=name,population,region,capital,flags,cca3");
        fetch("https://restcountries.com/v3.1/" + to + "?fields=name,population,region,capital,flags,cca3")
        .then(request => request.ok ? request.json() : null)
        .then(json => {
            if(json){
                json.sort(this.sortWords);
                this.setState(prev => ({
                    results: json,
                    //filter, if filter is set
                    filteredResults: prev.filter ? json.filter(country => country.region == prev.filter) : json
                }));
            }
        });
    }

    sortWords(a, b) {
        var nameA = a.name.common.toLowerCase(), nameB = b.name.common.toLowerCase();
        if(nameA < nameB){
            return -1;
        }
        if(nameA > nameB){
            return 1;
        }
        return 0;
    }

    //set the filter for a region
    setFilter(region){
        this.setState(prev => {
            region = region == "" ? null : region;
            let filtered = region ? prev.results.filter(country => country.region == region) : prev.results;
            //update the current results with the given filter
            return Object.assign({}, prev, {filteredResults: filtered, filter: region});
        })
    }

    //view a specific country (cca3 code)
    focusCountryAndRequest(code){
        if(code){
            //get all information about country
            fetch("https://restcountries.com/v3.1/alpha/" + code)
            .then(request => request.ok ? request.json() : null)
            .then(country => {
                if(country){
                    //the countrys borders are also cca3 codes
                    //get the name of the border countries with another request (if country has borders)
                    if(country[0].borders == null){
                        return this.setState(prev => Object.assign({}, prev, {viewCountry: country[0]}));
                    } else{
                        //get border countries names
                        fetch("https://restcountries.com/v3.1/alpha?codes=" + country[0].borders.join(",") + "&fields=name,cca3")
                        .then(response => response.json())
                        .then(borders => {
                            return this.setState(prev => Object.assign({}, 
                                prev, 
                                {
                                    //set the data in the state, therefore the ViewCountry component will be rendered with that information instead of the main page
                                    viewCountry: Object.assign(country[0], {borders: borders.filter(x => country[0].borders.includes(x.cca3)).sort(this.sortWords)})
                                }
                            ));
                        });
                    }
                }
            });
        }else{
            this.setState(prev => Object.assign({}, prev, {viewCountry: null}));
        }
    }

    render(){
        return <div>
            <Navbar/>
            <Search search={this.makeRequestNecessary}  filter={this.setFilter} viewingCountry={this.state.viewCountry != null} focus={this.focusCountryAndRequest}/>
            {this.state.viewCountry ? <ViewCountry data={this.state.viewCountry} focus={this.focusCountryAndRequest}/> : <Countries countries={this.state.filteredResults} focus={this.focusCountryAndRequest}/>}
        </div>
    }
}


// CHANGE COUNTRY CODES TO COUNTRY NAMES
// CHANGE DESIGN