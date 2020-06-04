import React, {Component, Button} from "react"
import queryString from "query-string";
import {parse} from 'qs'
import {useLocation,} from "react-router-dom";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import commentbox from 'commentbox.io';
import Comment from './Comment'
import {Nav, Navbar, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {FaRegBookmark, FaBookmark} from "react-icons/fa";
import {Link} from 'react-router-dom';
import AsyncSelect from 'react-select/lib/Async';
import Form_No_Switch from './Form_No_Switch'
import BounceLoader from "react-spinners/BounceLoader";
import {useRef, useEffect} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {css, right} from 'glamor'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer, toast} from 'react-toastify';
import qs from 'qs';
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    TwitterShareButton,
    FacebookShareButton,
    EmailShareButton,
} from "react-share";

toast.configure();
const COMMENTBOX_KEY = '5661504607092736-proj';
const debounce = require('lodash.debounce');

function renderFacebook(props) {
    return (
        <Tooltip id="button-tooltip1" {...props}>
            Facebook
        </Tooltip>
    );
}

function renderTwitter(props) {
    return (
        <Tooltip id="button-tooltip2" {...props}>
            Twitter
        </Tooltip>
    );
}

function renderEmail(props) {
    return (
        <Tooltip id="button-tooltip3" {...props}>
            Email
        </Tooltip>
    );
}

function renderBookmark(props) {
    return (
        <Tooltip id="button-tooltip4">
            Bookmark
        </Tooltip>
    );
}

// window.scrollTo({top: 0, left: 0, behavior: 'smooth' });

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

class DetailArticle extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    }

    removeCommentBox = null;
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            data        : [],
            loading     : true,
            btnNewScreen: false,
            id          : "",
            web_url     : "",
            check       : JSON.parse(localStorage.getItem('mode')) === 'Guardian' ? true : false,
            Guardian    : true,
            showMore    : false,
            mark        : "\u2228",
            flag        : this.checkExist ? 1 : 0,
            modalShow   : false,
            title       : "",
            exist       : this.checkExist ? 1 : 0,
            start       : false

        };
        this.removeCommentBox = commentbox(COMMENTBOX_KEY);

        // this.showMoreHandler = this.showMoreHandler.bind(this)
        this.showContent = this.showContent.bind(this)
        this.notify = this.notify.bind(this)
        this.onChanges = this.onChanges.bind(this)
        this.myDivToFocus_first = React.createRef()
        this.myDivToFocus_second = React.createRef()

    }

    CheckExist() {
        var dum = 0
        for (let i = 0, l = localStorage.length; i < l; i++) {
            console.log("id inside Check", this.state.id)
            console.log("Key local Storage", localStorage.key(i))
            console.log("Equal? ", this.state.id === localStorage.key(i))

            if (localStorage.key(i) === this.state.id) {
                this.setState({flag: 1})
                dum = 1
                break
            } else {
                continue
            }
        }
        return dum === 1 ? true : false;
    }

    notify() {
        if (this.state.flag === 0) {
            toast(this.state.Guardian ? "Saving " + this.state.data.webTitle :
                "Saving " + this.state.data.docs[0].headline.main, {
                className: css({
                    color: "black !important"
                })
            });
            this.store(this.state.data)

            this.setState({flag: 1})
        } else {
            toast(this.state.Guardian ? "Removing " + this.state.data.webTitle :
                "Removing " + this.state.data.docs[0].headline.main, {
                className: css({
                    color: "black !important"
                })
            });
            this.remove(this.state.id)
            this.setState({flag: 0})
        }
        this.render();
    }

    store(obj) {
        this.state.Guardian ?
            localStorage.setItem(obj.id, JSON.stringify({
                'id'       : obj.id,
                'titles'   : obj.webTitle,
                'date'     : obj.webPublicationDate,
                'img'      : obj.url_Link,
                'section'  : obj.sectionId,
                'desc'     : obj.blocks.body[0].bodyTextSummary,
                'shortDesc': obj.short_desc,
                'source'   : 'Guardians',
                'direct'   : obj.webUrl,
                'desc_Link': "/article?id=" + this.state.id
            })) :

            localStorage.setItem(obj.docs[0]._id, JSON.stringify({
                'id'       : obj.docs[0]._id,
                'titles'   : obj.docs[0].headline.main,
                'date'     : obj.docs[0].published_date,
                'img'      : obj.docs[0].url_Link,
                'section'  : obj.docs[0].section_name,
                'desc'     : obj.docs[0].abstract,
                'shortDesc': obj.docs[0].short_desc,
                'source'   : 'NY',
                'direct'   : this.state.web_url,
                'desc_Link': "/article?id=" + this.state.id + '&web_url=' + this.state.web_url
            }))

    }

    remove(key) {
        localStorage.removeItem(key);
    }

    async componentDidMount() {

        const {location} = this.props
        this._isMounted = true;
        const query = parse(location.search.substr(1))
        var url = '';
        if (query.web_url) {
            url = "/article?id=" + query.id + '&web_url=' + query.web_url;
            this.setState({Guardian: false})
            this.setState({check: false})
        } else {
            url = "/article?id=" + query.id;
            this.setState({Guardian: true})
            this.setState({check: true})
        }
        const response = await fetch(url);
        const data = await response.json();

        this.setState({data: data.temp});
        this.setState({loading: false})

        query.web_url ? this.setState({id: data.temp.docs[0]._id}) :
            this.setState({id: data.temp.id})

        query.web_url ? this.setState({web_url: query.web_url}) :
            this.setState({web_url: data.temp.webUrl})

        query.web_url ? this.setState({title: data.temp.docs[0].headline.main}) :
            this.setState({title: data.temp.webTitle})
        this.CheckExist()
    }


    componentWillUnmount() {
        this._isMounted = false;
        this.removeCommentBox();
        if(this.state.start !== this.props.start) {
            this.props.changeSwitch(this.state.start)
        }
    }

    showContent() {
        if (this.state.showMore) {
            var len = this.state.data.short_desc.length
            return this.state.data.short_desc.substring(0, len - 2)
        } else {
            return this.state.data.short_desc
        }
    }

    showRestContent() {
        if (this.state.showMore) {
            return this.state.data.long_desc
        } else {
            return null
        }
    }

    showContentNY() {
        if (this.state.showMore) {
            var len = this.state.data.docs[0].short_desc
            return this.state.data.docs[0].short_desc.substring(0, len - 2)
        } else {
            return this.state.data.docs[0].short_desc
        }
    }

    showRestContentNY() {
        if (this.state.showMore) {
            return this.state.data.docs[0].long_desc
        } else {
            return null
        }
    }

    elementDidMount() {
        this.removeCommentBox = commentbox(COMMENTBOX_KEY);
    }

    onChanges() {
        this.props.changeLink()
    }
    render() {
        // debugger

        if (!this.state.loading) {

            console.log("Start State Guardian ",this.state.start)
            console.log("Start props State Guardian ",this.props.start)
    
            return (
                <div>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                        className='toaster'
                    />
                    <div className='custom-control custom-switch'>

                        <div className={"container-fluid"}>
                            <div className={"row"}>
                                <div className="col-12 mt-3">
                                    <div className="card">
                                        <div className="card-veritical">
                                            <div className="titles">
                                                <h4 className="card-title" style={{fontWeight: 'bold', margin: 0, fontStyle: 'italic', fontSize: 20}}>{this.state.Guardian ? this.state.data.webTitle : this.state.data.docs[0].headline.main}</h4>

                                                <div class="row">
                                                    <div class="col-4 text-left" style={{marginTop: 5, fontSize: 14, fontStyle: 'italic'}}>
                                                        {this.state.Guardian ? this.state.data.webPublicationDate : this.state.data.docs[0].published_date}
                                                    </div>
                                                    <div class="col-8 text-right p-0">
                                                        <OverlayTrigger
                                                            placement={"top"}
                                                            delay={{show: 250, hide: 400}}
                                                            overlay={renderFacebook()}
                                                        >
                                                <span style={{cursor: 'pointer'}} onClick={() => window.open("https://www.facebook.com/sharer/sharer.php?u="
                                                    + this.state.web_url + "&hashtag=%23CSCI_571_NewsApp", 'blink')}>
                                                            <FacebookIcon round size={30}/>
                                                </span>

                                                            {/* <FacebookShareButton url={this.state.web_url} title={this.state.title} hashtag = '#CSCI_571_NewsApp' style={{}}>
                                                    <FacebookIcon classNme= 'btn btn-circle' size={30} round={true}> </FacebookIcon>
                                                </FacebookShareButton> */}
                                                        </OverlayTrigger>

                                                        <OverlayTrigger
                                                            placement={"top"}
                                                            delay={{show: 250, hide: 400}}
                                                            overlay={renderTwitter()}
                                                        >
                                                    <span style={{cursor: 'pointer'}} onClick={() => window.open('https://twitter.com/intent/tweet?url=%23&text='
                                                        + this.state.web_url + '%20%23CSCI_571_NewsApp', '_blink')}>
                                                                <TwitterIcon round size={30}/>
                                                    </span>

                                                            {/* <TwitterShareButton url={this.state.web_url} title={this.state.title} hashtags = {['CSCI_571_NewsApp']} style={{}}>
                                                    <TwitterIcon classNme= 'btn btn-circle' size={30} round={true}> </TwitterIcon>
                                                </TwitterShareButton> */}

                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement={"top"}
                                                            delay={{show: 250, hide: 400}}
                                                            overlay={renderEmail()}
                                                        >
                                                    <span style={{cursor: 'pointer'}} onClick={() => window.open('mailto:?subject=%23CSCI_571_NewsApp&body='
                                                        + this.state.web_url, '_blink')}>
                                                                <EmailIcon round size={30}/>
                                                    </span>

                                                            {/* <EmailShareButton url={this.state.web_url} title={this.state.title} subject = '#CSCI_571_NewsApp' style={{}}>
                                                    <EmailIcon classNme= 'btn btn-circle' size={30} round={true}> </EmailIcon>
                                                </EmailShareButton> */}
                                                        </OverlayTrigger>
                                                        <span>
                                                {this.state.flag === 1 ?
                                                    <OverlayTrigger
                                                        placement={"top"}
                                                        delay={{show: 250, hide: 400}}
                                                        overlay={
                                                            <Tooltip id="button-tooltip4">
                                                                Bookmark
                                                            </Tooltip>}
                                                    >
                                                    <span onClick={this.notify}>
                                                    <FaBookmark className={"bookmark"} style={{fontSize: 30}}/>
                                                    </span>
                                                    </OverlayTrigger>

                                                    :

                                                    <OverlayTrigger
                                                        placement={"top"}
                                                        delay={{show: 250, hide: 400}}
                                                        overlay={
                                                            <Tooltip id="button-tooltip4">
                                                                Bookmark
                                                            </Tooltip>}
                                                    >
                                                    <span onClick={this.notify}>
                                                    
                                                        <FaRegBookmark className={"bookmark"} style={{fontSize: 30}}/>
                                                    </span>
                                                    </OverlayTrigger>}
                                                    </span>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="img-square-wrapper">
                                                <img id="detailImg" src={this.state.Guardian ? this.state.data.url_Link : this.state.data.docs[0].url_Link} alt="Card image cap"/>
                                            </div>
                                            <p id="description">
                                                {this.state.Guardian ? this.showContent() : this.showContentNY()}
                                            </p>
                                            <p id="description2">
                                            </p>
                                            {/* {this.state.showMore ? <p className = "description" ref = {this.myDivToFocus_second}>
                                                                {this.state.Guardian? this.showRestContent(): this.showRestContentNY()}                                    
                                                            </p>: 
                                                            <p className = "description" ref = {this.myDivToFocus_second}>

                                                            </p>} */}
                                            <div id='dropdown' onClick={() => {

                                                if (this.state.showMore) {
                                                    this.setState({mark: '\u2228'})
                                                } else {
                                                    this.setState({mark: "\u2227"})
                                                }
                                                if (this.state.showMore) {
                                                    document.getElementById('description2').innerHTML = ''
                                                    document.getElementById('root').scrollIntoView({block: 'start', behavior: 'smooth'})
                                                    // document.body.scrollTop = 0


                                                    // document.getElementById('root').scrollIntoView({block: 'start', behavior: 'smooth'})
                                                    // document.getElementById('root').scrollIntoView(false);
                                                    // document.getElementById('root').scrollTop();
                                                    // window.scrollTo({top:0, behavior: 'smooth'})


                                                } else {
                                                    this.state.Guardian ? document.getElementById('description2').innerHTML = this.state.data.long_desc :
                                                        document.getElementById('description2').innerHTML = this.state.data.docs[0].long_desc


                                                    document.getElementById('description2').scrollIntoView({block: 'start', behavior: 'smooth'})
                                                    // document.getElementById('root').scrollIntoView({block: 'start', behavior: 'smooth'})

                                                }
                                                this.setState({showMore: !this.state.showMore});


                                            }}>{this.state.mark}</div>
                                            {this.state.web_url ? <div className={"commentbox"} id={this.state.web_url} ref={this.elementDidMount.bind(this)}></div> :
                                                <div></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-12'}>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            )
        } else {
            return (
                <div>
                    <div class="d-flex flex-column bd-highlight mb-3 justify-content-center align-items-center" style={{height: 600}}>
                        <div class="p-2 bd-highlight">
                            <BounceLoader className='boundceLoader'
                                          size={70}
                                          color={"#123abc"}
                                          loading={this.state.loading}
                            />
                        </div>
                        <div class="p-2 bd-highlight"><h1 style={{marginLeft: 25}}>loading...</h1></div>
                    </div>
                </div>
            )
        }
    }

}

export default withRouter(DetailArticle)
