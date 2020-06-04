import React, {Component} from 'react';
import {Nav, Navbar, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {NavLink} from 'react-router-dom';
import AsyncSelect from 'react-select/lib/Async';
import SwitchTop from './SwitchTop'
import { useHistory } from "react-router-dom";

const debounce = require('lodash.debounce');

function renderBookmark(props) {
    return (
        <Tooltip id="button-tooltip4" {...props}>
            Bookmark
        </Tooltip>
    );
}
class Form_Main extends Component {
    constructor(props) {
        super(props)
        const query = new URLSearchParams(window.location.search).get('q')
        this.state = {
            btnNewScreen  : false,
            results       : [],
            selectedResult: query === null ? '' : query,
            data          : [], loading: true,
            check         : this.props.check,
            selectedOption: '',
            placeholder   : 'Enter your keyword ..',
            isDisplay     : props.isDisplay,
            isBookmark    : (window.location.pathname === '/favorites'),
            close        : false
        };
        this.onChanges = this.onChanges.bind(this)
    }

    onChanges() {
        this.props.changeLink()
    }
    changeExpand() {
        this.setState({expand: false})
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

    refresh() {
        if (this.state.selectedResult) {
            this.setState({
                selectedResult: ''
            });
            document.location.replace('/');
        }
    }
    refresh_World() {
        if (this.state.selectedResult) {
            this.setState({
                selectedResult: ''
            });
            document.location.replace('/World');
        }
    }
    refresh_Politics() {
        if (this.state.selectedResult) {
            this.setState({
                selectedResult: ''
            });
            document.location.replace('/Politics');
        }
    }
    refresh_Business() {
        if (this.state.selectedResult) {
            this.setState({
                selectedResult: ''
            });
            document.location.replace('/Business');
        }
    }
    refresh_Technology() {
        if (this.state.selectedResult) {
            this.setState({
                selectedResult: ''
            });
            document.location.replace('/Technology');
        }
    }
    refresh_Sports() {
        if (this.state.selectedResult) {
            this.setState({
                selectedResult: ''
            });
            document.location.replace('/Sports');
        }
    }
    refresh_Favorites() {
        if (this.state.selectedResult) {
            this.setState({
                selectedResult: ''
            });
            document.location.replace('/favorites');
        }
    }
    closeNav() {
        this.setState({close: true})
    }
    componentDidUpdate() {
        const isDisplay = !(window.location.pathname === '/search' || window.location.pathname === '/article' || window.location.pathname === '/favorites')
        console.log("isDisplay?",isDisplay)
        this.setState({selectedResult: ""})

    }
    componentWillUnmount() {
        this.props.closeBookmark()
        this.setState({selectedResult: ""})

    }
    clear() {
        this.setState({selectedResult: ""})
    }
    render() {
        const {isBookmark} = this.state;
        console.log("Bookmark Form Main? ", isBookmark)
        const isDisplay = !(window.location.pathname === '/search' || window.location.pathname === '/article' || window.location.pathname === '/favorites')
        console.log("Display?",isDisplay)
        if(isDisplay !== this.state.isDisplay) {
            this.setState({isDisplay: isDisplay})
        }

        return (
            <div className="App">
                <Navbar id = "navbar" collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <AsyncSelect
                        style={{minWidth: 250}}
                        defaultInputValue={this.state.selectedResult}
                        loadOptions={debounce(this.fetchData, 1000)}
                        placeholder={this.state.placeholder}
                        onChange={(e) => {
                            this.onSearchChange(e)
                            document.location.href = '/search?q=' + e.value;
                        }}
                        noOptionsMessage={() => "No Match"}/>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <NavLink onClick={this.refresh.bind(this)} className={'nav-link'} activeClassName={'active'} exact to="/">Home</NavLink>
                            <NavLink onClick={this.refresh_World.bind(this)} className={'nav-link'} activeClassName={'active'} exact to="/World">World</NavLink>
                            <NavLink onClick={this.refresh_Politics.bind(this)} className={'nav-link'} activeClassName={'active'} exact to="/Politics">Politics</NavLink>
                            <NavLink onClick={this.refresh_Business.bind(this)} className={'nav-link'} activeClassName={'active'} exact to="/Business">Business</NavLink>
                            <NavLink onClick={this.refresh_Technology.bind(this)} className={'nav-link'} activeClassName={'active'} exact to="/Technology">Technology</NavLink>
                            <NavLink onClick={this.refresh_Sports.bind(this)} className={'nav-link'} activeClassName={'active'} exact to="/Sports">Sports</NavLink> */}
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/">Home</NavLink>
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/World">World</NavLink>
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/Business">Business</NavLink>
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/Politics">Politics</NavLink>
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/Technology">Technology</NavLink>
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/Sports">Sports</NavLink>

                        </Nav>
                        <Nav className="ml-auto">
                            <NavLink onClick={this.refresh_Favorites.bind(this)} className={'nav-link'} activeClassName={'active'} exact to="/favorites">
                                {this.props.bookmark && (<OverlayTrigger placement="bottom" delay={{show: 250, hide: 400}} overlay={renderBookmark()}><FaBookmark className="bookmarkTop" style={{fontSize: 25}}/></OverlayTrigger>)}
                                {!this.props.bookmark && (<OverlayTrigger placement="bottom" delay={{show: 250, hide: 400}} overlay={renderBookmark()}><FaRegBookmark className="bookmarkTop" style={{fontSize: 25}}/></OverlayTrigger>)}
                            </NavLink>
                            {isDisplay && (<><span id="NY_Times">NY Times</span>
                                <SwitchTop class="navbar-nav ml-auto" changeLink={this.onChanges.bind(this)} check={this.props.check} changeExpand = {this.closeNav.bind(this)}/>
                                <span id='Guardians'>Guardians</span></>)}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar></div>
        )
    }
}

export default Form_Main;
