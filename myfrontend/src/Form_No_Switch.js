import React, {Component} from 'react';
import {Nav, Navbar, Form, FormControl} from 'react-bootstrap';
import {FaRegBookmark, FaBookmark} from "react-icons/fa";
import {Link, NavLink} from 'react-router-dom';
import AsyncSelect from 'react-select/lib/Async';
import {parse} from 'qs'
import SwitchTop from './SwitchTop'
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

const debounce = require('lodash.debounce');

function renderBookmark(props) {
    return (
        <Tooltip id="button-tooltip4" {...props}>
            Bookmark
        </Tooltip>
    );
}

class Form_No_Switch extends Component {

    constructor(props) {
        super(props)
        const query = new URLSearchParams(window.location.search).get('q')

        this.state = {
            btnNewScreen  : false,
            results       : [],
            selectedResult: query === null ? '' : query,
            data          : [],
            loading       : true,
            check         : this.props.check,
            selectedOption: null,
            placeholder   : 'Enter your keyword ..',
            searchResult  : this.props.searchKey,
            clicked       : query === null
        };
        this.onChanges = this.onChanges.bind(this)
    }

    onChanges() {
        this.props.changeLink()
    }

    fetchData = (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
        } else {
            setTimeout(() => {
                fetch(
                    `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${inputValue}`,
                    {
                        headers: {
                            "Ocp-Apim-Subscription-Key": "4f33ee669c024a35aa28c7c0953cf7b2"
                        }
                    }
                )
                    .then((resp) => {
                        return resp.json()
                    })
                    .then((data) => {
                        console.log("Data: ", data)
                        var dummy = data.suggestionGroups[0].searchSuggestions
                        const tempArray = [];
                        for (let i = 0; i < dummy.length; i++) {
                            tempArray.push({label: dummy[i].displayText, value: dummy[i].displayText})
                        }
                        console.log(tempArray)
                        callback(tempArray)
                    })
                    .catch((error) => {
                        console.log(error, "catch the hoop")
                    });
            }, 1000)
        }
    }

    onSearchChange = (selectedOption) => {
        if (selectedOption) {
            this.setState({
                selectedOption
            });
        }
    }

    render() {
        if (!this.state.loading) {
            console.log(this.state.data)
        }
        return (

            <div className="App" id='start'>
                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <AsyncSelect style={{minWidth: 250}}
                                 placeholder={this.state.placeholder}
                                 defaultInputValue={this.state.selectedResult}
                                 value={this.state.selectedOption}
                                 loadOptions={debounce(this.fetchData, 1000)}
                                 onChange={(e) => {
                                     this.onSearchChange(e)
                                     console.log("e: ", e)
                                     document.location.href = '/search?q=' + e.value;
                                 }}
                                 noOptionsMessage={() => "No Match"}/>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="mr-auto">
                            <Nav.Link exact={true} as={NavLink} to="/" href='/'>Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/World" href='/World'>World</Nav.Link>
                            <Nav.Link as={NavLink} to="/Politics" href='/Politics'>Politics</Nav.Link>
                            <Nav.Link as={NavLink} to="/Business" href='/Business'>Business</Nav.Link>
                            <Nav.Link as={NavLink} to="/Technology" href='/Techonology'>Technology</Nav.Link>
                            <Nav.Link as={NavLink} to="/Sports" href='/Sports'>Sports</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link as={NavLink} to="/favorites" href='/favorites'>
                                <OverlayTrigger
                                    placement="down"
                                    delay={{show: 250, hide: 400}}
                                    overlay={renderBookmark()}
                                >

                                    {this.props.flag ? <FaBookmark className="bookmarkTop" style={{fontSize: 25}}/> :
                                        <FaRegBookmark className="bookmarkTop" style={{fontSize: 25}}/>
                                    }
                                </OverlayTrigger>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>

            </div>
        )
    }
}

export default Form_No_Switch;
