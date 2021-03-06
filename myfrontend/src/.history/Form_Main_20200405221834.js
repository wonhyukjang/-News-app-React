import React, {Component} from 'react';
import {Nav, Navbar, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {NavLink} from 'react-router-dom';
import AsyncSelect from 'react-select/lib/Async';
import SwitchTop from './SwitchTop'
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router';

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
            close         : false,
            search        : (window.location.pathname === '/search'),
            select        : props.keyword
        };
        this.onChanges = this.onChanges.bind(this)
    }


    handleClick(args) {
      this.state.history.push(this.searchText + args);
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
                            "Ocp-Apim-Subscription-Key": "07aa6645f303473694af78aeb1297917"
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
            // this.setState({
            //     selectedOption
            // })
            // this.props.history.push({
            //     pathname:'/search?q=' + selectedOption.val})

                let query = this.props.search;
                console.log("query? : ",query)
                this.props.setQuery(selectedOption) 
                this.props.history.push({
                pathname: "/search?q=" + query
                });
                 
                //  if(this.state.selectedOption)
                //     this.props.history.push({
                //         pathname: "/search?q=" + query
                //     });

            // const history = useHistory();
            // history.push('/search?'+ selectedOption)
        }
    }
    
    closeNav() {
        this.setState({close: true})
    }
    componentDidUpdate() {
        // const isDisplay = !(window.location.pathname === '/search' || window.location.pathname === '/article' || window.location.pathname === '/favorites')
        // console.log("isDisplay?",isDisplay)
        // this.setState({selectedResult: ""})
        // this.state.selectedResult = ""
    }
    componentWillUnmount() {
        this.props.closeBookmark()
        // this.setState({selectedResult: ""})

    }
    clear() {
        this.setState({selectedResult: ""})
    }
    render() {
        const {isBookmark} = this.state;
        console.log("Bookmark Form Main? ", isBookmark)
        const isDisplay = !(window.location.pathname === '/search' || window.location.pathname === '/article' || window.location.pathname === '/favorites')
        const check = (window.location.pathname === '/search')
        console.log("Display?",isDisplay)
        console.log("Display State: ", this.state.isDisplay)
        console.log("Display search: ", this.state.check)
        console.log("Display Query: ", this.state.select)

        // const history = useHistory();
        // const handleSubmit = (arg) => {
        //     history.push('/search?q='+ arg)
        // }
        // if(isDisplay) {
        //     this.props.setQuery();
        // }
        return (
            <div className="App">
                <Navbar id = "navbar" collapseOnSelect expand="lg" bg="primary" variant="dark">

                    <AsyncSelect
                        style={{minWidth: 250}}
                        defaultInputValue={this.props.keyword? this.props.keyword : null}
                        loadOptions={debounce(this.fetchData, 1000)}
                        placeholder={this.state.placeholder}
                        onChange={(e) => {
                            const value = e.value;
                            // this.props.setQuery(value);
                            // localStorage.setItem('search', JSON.stringify(value))
                            this.props.setSearch(e)
                            this.props.history.push('/search?q=' + value);
                        }}
    
                        // onChange={(e) => {
                        //     console.log("E",e)
                        //     this.onSearchChange(e);
                            // onChange = {(e) => {
                            //     this.setState({
                            //         selectedOption: e
                            //     },() => {
                            //       this.props.history.push({
                            //           pathname:'/search?q=' + e.val});
                            //     })
                            //   }}
                            // this.handleClick(e.value)   
                            // handleSubmit(e.valule)
                            // () => history.push('/search?q='+e.value)
                                                                                 
                            // document.location.href = '/search?q=' + e.value;
                        // }}
                        
                        noOptionsMessage={() => "No Match"}/>
                    {/* {this.state.selectedResult? handleSubmit(this.state.selectedResult): null} */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/">Home</NavLink>
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/World">World</NavLink>
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/Business">Business</NavLink>
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/Politics">Politics</NavLink>
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/Technology">Technology</NavLink>
                            <NavLink   className={'nav-link'} activeClassName={'active'} exact to="/Sports">Sports</NavLink>

                        </Nav>
                        <Nav className="ml-auto">
                            <NavLink className={'nav-link'} activeClassName={'active'} exact to="/favorites">
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

export default withRouter(Form_Main);
