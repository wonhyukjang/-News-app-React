import React, {Component} from 'react';
import './App.css';
import 'mdbreact/dist/css/mdb.css';
import Card from "./Card"
import DetailArticle from "./DetailArticle"
import Word_Card from "./Word_Card"
import Politic_Card from "./Politic_Card"
import Business_Card from "./Business_Card"
import Technology_Card from "./Technology_Card"
import Sports_Card from "./Sports_Card"
import Favorites from "./Favorites"
import Search from "./Search"
import Guardian_World from "./Guardian_World"
import Guardian_Politics from "./Guardian_Politics"
import Guardian_Business from "./Guardian_Business"
import Guardian_Technology from "./Guardian_Technology"
import Guardian_Sport from "./Guardian_Sport"
import Guardian_Home from "./Guardian_Home"
import Form_Main from "./Form_Main"

import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";

// import 'bootstrap/dist/css/bootstrap-theme.css';
if (!JSON.parse(localStorage.getItem('mode'))) {
    localStorage.setItem('mode', JSON.stringify('Guardian'))
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            switch1: true,
            check  : JSON.parse(localStorage.getItem('mode')) === 'Guardian' ? true : false,
            start  : true,
            isDisplay: !(window.location.pathname === '/search' || window.location.pathname === '/article' || window.location.pathname === '/favorites'),
            bookmark: false,
            // selectAPI: localStorage.getItem("search") === "None" ? true  : false,
            query : "",
            show: false
        }
        this.onChange = this.onChange.bind(this)
        this.changeStart = this.changeStart.bind(this)
    }
    changeShow() {
        this.setState({show: true})
    }
    // const [selectAPI, setSelectAPI] = React.useState(() => {
    //     if (localStorage.getItem('jw_selectAPI')) {
    //         return localStorage.getItem('jw_selectAPI') === 'true';
    //     }
    //     return false;
    // });

    // const handleSelectAPI = React.useCallback(() => {
    //     setSelectAPI(!selectAPI);
    //     localStorage.setItem('jw_selectAPI', (!selectAPI).toString());
    // }, [selectAPI]);
    changeSwitch() {
        if(window.location.pathname === '/search' || window.location.pathname === '/article' || window.location.pathname === '/favorites'){
            this.setState({isDisplay: true})
        } else {
            this.setState({isDisplay: false})
        }
    }
    showSwitch() {
        this.setState({isDisplay: true})
    }

    closeBookmark() {
        this.setState({bookmark: false})
    }

    handler() {
        this.setState({
            btnNewScreen: true
        });
        this.props.changeLink()

    }

    onChange() {
        this.setState(prevState => ({
            check: JSON.parse(localStorage.getItem('mode')) === 'Guardian' ? true : false,
        }));
    }

    changeStart() {
        this.setState({start: !this.state.start})
    }
    changeSearch(arg) {
        // localStorage.setItem('select', JSON.stringify(props))
        this.setState({query: arg})
    }
    render() {

        const isDisplay = !(window.location.pathname === '/search' || window.location.pathname === '/article' || window.location.pathname === '/favorites')
        if(isDisplay !== this.state.isDisplay) {
            this.setState({isDisplay: isDisplay})
        }
        const isBookmark = window.location.pathname === '/favorites'
        if(isBookmark !== this.state.bookmark) {
            this.setState({bookmark:isBookmark})
        }
        // console.log("IsDisplay",isDisplay)
        // console.log("IsDisplayState: ",this.state.isDisplay)

        console.log("App bookmakr: ",this.state.bookmark)

        return (
            <Router>
                <Form_Main changeLink={this.onChange.bind(this)} check={this.props.check} 
                                        isDisplay={this.isDisplay} switch = {this.state.isDisplay}
                                        bookmark={this.state.bookmark} closeBookmark = {this.closeBookmark.bind(this)} keyword={this.state.query} setSearch={this.changeSearch.bind(this)}/>

                <Switch>

                    <Route path="/" exact component={this.state.check ?
                        () => <Guardian_Home changeLink={this.onChange.bind(this)} check={this.state.check} start={this.state.start} changeSwitch = {this.changeStart.bind(this)}/>
                        : () => <Card changeLink={this.onChange.bind(this)} check={this.state.check} />}/>
                    <Route path="/World" exact component={this.state.check ?
                        () => <Guardian_World changeLink={this.onChange.bind(this)} check={this.state.check}/>
                        : () => <Word_Card changeLink={this.onChange.bind(this)} check={this.state.check}/>}/>

                    <Route path="/Politics" exact component={this.state.check ?
                        () => <Guardian_Politics changeLink={this.onChange.bind(this)} check={this.state.check}/>
                        : () => <Politic_Card changeLink={this.onChange.bind(this)} check={this.state.check}/>}/>

                    <Route path="/Business" exact component={this.state.check ?
                        () => <Guardian_Business changeLink={this.onChange.bind(this)} check={this.state.check}/>
                        : () => <Business_Card changeLink={this.onChange.bind(this)} check={this.state.check}/>}/>

                    <Route path="/Technology" exact component={this.state.check ?
                        () => <Guardian_Technology changeLink={this.onChange.bind(this)} check={this.state.check}/>
                        : () => <Technology_Card changeLink={this.onChange.bind(this)} check={this.state.check}/>}/>
                    <Route path="/Sports" exact component={this.state.check ?
                        () => <Guardian_Sport changeLink={this.onChange.bind(this)} check={this.state.check}/>
                        : () => <Sports_Card changeLink={this.onChange.bind(this)} check={this.state.check}/>}/>

                    <Route path="/Favorites" exact component={() => <Favorites start={this.state.isDisplay} changeSwitch = {this.changeStart.bind(this)} showSwitch = {this.showSwitch.bind(this)}/>}/>

                    <Route path="/article" exact component={() => <DetailArticle changeLink={this.onChange.bind(this)} checked={this.state.check} start={this.state.start} changeSwitch = {this.changeStart.bind(this)}/>}/>
                    <Route path='/Search' exact component={() => <Search start={this.state.isDisplay} checked={this.state.check} changeSwitch = {this.changeStart.bind(this)} showSwitch = {this.showSwitch.bind(this)} changeShow={this.changeShow.bind(this)}
                    setQuery={this.changeSearch.bind(this)}/>}/>

                </Switch>
            </Router>
        );
    }

}

// export default withRouter(App);
export default App;