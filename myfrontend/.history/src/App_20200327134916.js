import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import 'mdbreact/dist/css/mdb.css';
import Card from "./Card"
import DetailArticle from "./DetailArticle"
import Word_Card from "./Word_Card"
import Politic_Card from "./Politic_Card"
import Business_Card from "./Business_Card"
import Technology_Card from "./Technology_Card"
import Sports_Card from "./Sports_Card"
import Guardian_Home from "./Guardian_Home"
import Favorites from "./Favorites"
import Empty from "./Empty"
import Search from "./Search"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { withRouter } from "react-router";
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { FaRegBookmark,FaBookmark } from "react-icons/fa";
import AsyncSelect from 'react-select/lib/Async';
import { parse } from 'qs'
import SwitchTop from './SwitchTop'

import commentbox from 'commentbox.io';

// import 'bootstrap/dist/css/bootstrap-theme.css';
if(!JSON.parse(localStorage.getItem('mode'))) {
  localStorage.setItem('mode', JSON.stringify('Guardian'))  
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      switch1: true,
      check: JSON.parse(localStorage.getItem('mode')) === 'Guardian' ? true : false,
    }
    this.handleSwitchChange = this.handleSwitchChange.bind(this)
    this.onChange = this.onChange.bind(this)
}
// state = { results:[], selectedResult:null, data: [], loading:true, check: true};
onChange() {
  this.setState(prevState => ({
    check: JSON.parse(localStorage.getItem('mode')) === 'Guardian' ? true : false
  }));
}
  handleSwitchChange = nr => () => {
    let switchNumber = `switch${nr}`;
    this.setState({
      [switchNumber]: !this.state[switchNumber]
    });
  }
  // const HeaderWithRouter = withRouter(Header);

  
  elementDidMount = () => {
    console.log(123123);
    const COMMENTBOX_KEY = '5679262484922368-proj';
    this.removeCommentBox = commentbox(COMMENTBOX_KEY);
  };

  render() {
      console.log("State main: ",this.state.check)
      return (
        <div>
          <div className={"commentbox"} id={"1234"} ref={this.elementDidMount}></div>
        </div>
      )
      // return (
      //   <Router>
      //           <Switch>
      //           <Route path="/" exact component= {this.state.check ? 
      //                                               () => <Guardian_Home changeLink={this.onChange.bind(this)} check={this.state.check}/>
      //                                               : () => <Card changeLink={this.onChange.bind(this)} check={this.state.check}/>}/>
      //           <Route path="/World" exact component= {this.state.check ? Empty: Word_Card}/>
      //           <Route path="/Politics" exact component= {this.state.check ? 
      //                                               () => <Guardian_Home changeLink={this.onChange.bind(this)} check={this.state.check}/>
      //                                               : () => <Politic_Card changeLink={this.onChange.bind(this)} check={this.state.check}/>}/>
      //           {/* {this.state.check ? Empty: Politic_Card}/> */}
      //           <Route path="/Business" exact component= {this.state.check ? Empty: Business_Card}/>
      //           <Route path="/Technology" exact component= {this.state.check ? Empty: Technology_Card}/>
      //           <Route path="/Sports" exact component= {this.state.check ? Empty: Sports_Card}/>
      //           <Route path="/Favorites" exact component= {Favorites}/>

      //           <Route path="/DetailArticle" exact component={() => <DetailArticle changeLink={this.onChange.bind(this)} checked = {this.state.check}/>}/>
      //           <Route path='/Search' exact component={() => <Search checked= {this.state.check}/>}/>
      //         {/* <Route path="/World" exact component= {this.state.check ? Empty: Word_Card}/>
      //         <Route path="/Politics" exact component= {this.state.check ? Empty: Politic_Card}/>
      //         <Route path="/Business" exact component= {this.state.check ? Empty: Business_Card}/>               */}
      //         </Switch>

      //         {/* <Route path= '/' exact component = {Form_Main}></Route> */}
      //   </Router>
      //   );
      }

}

{/* <Nav.Link href="#">Home</Nav.Link>
<Nav.Link href="#world">World</Nav.Link>
<Nav.Link href="#Politics">Politics</Nav.Link>
<Nav.Link href="#Business">Business</Nav.Link>
<Nav.Link href="#Technology">Technology</Nav.Link>
<Nav.Link href="#Sports">Sports</Nav.Link> */}

export default App;
