import React, {Component} from 'react';
import AsyncSelect from 'react-select/lib/Async';
import _ from "lodash";

class Searchbar extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            userName: '',
            suggestion: [],
            selectedOption: {},
            loading: true
        }
    }
    fetchData(inputValue, callback) {
        if(!inputValue) {
            callback([]);
        } else {
            setTimeout(() => {
                fetch(
                    `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?&q=${inputValue}`,
                    {
                      headers: {
                        "Ocp-Apim-Subscription-Key": "4f33ee669c024a35aa28c7c0953cf7b2"
                      }
                    }, {method: 'GET'}
                  );
            })
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                const tempArray = [];
                const resultsRaw = data.suggestionGroups[0].searchSuggestions;
                const results = resultsRaw.map(result => ({ title: result.displayText, url: result.url }));
                tempArray.push(results)
            callback(tempArray);
            this.setState({suggestion:data})
            
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });
        }
    }

    onSearchChange = (selectedOption) => {
        if(selectedOption) {
            this.setState({
                selectedOption
            });
        }
    } 
    render() {
        return (
            <div>
                <AsyncSelect
                    value= {this.state.selectedOption}
                    loadOptions= {this.fetchData}
                    placeholder = "Search box"
                    onChange = {(e) => {
                        this.onSearchChange(e);
                    }}
                    defaultOptions= {false}/>
            </div>)
    }
}
export default Searchbar;