import React, {Component} from "react";
export default class Weather extends Component {
    constructor() {
        super()
        this.state = {
            weather: "Not yet gotten"
        };
    }
    handleButtonClick = () => {
        fetch("/weatherNY")
            .then(response => response.json())
            .then(response => {
                this.setState({
                    weather: response.temp_c
                });
            });
    }
    render() {
        return (
            <div>
                <button onClick={this.handleButtonClick}>Get weather in NY</button>
                <h1> The weather in NY is: {this.state.weather}</h1>
            </div>
        );
    }
}