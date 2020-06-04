import React, {Component} from "react"
import queryString from "query-string";
import { parse } from 'qs'
import { useLocation, } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import commentbox from 'commentbox.io';
import Comment from './Comment'
import { Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaRegBookmark,FaBookmark } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/lib/Async';
import Form_No_Switch from './Form_No_Switch'
import BounceLoader from "react-spinners/BounceLoader";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  import {css, right} from 'glamor'
  import 'react-toastify/dist/ReactToastify.css'
  import { ToastContainer, toast } from 'react-toastify';
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
const COMMENTBOX_KEY = '5679262484922368-proj';
const debounce = require('lodash.debounce');

function renderFacebook(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Facebook
      </Tooltip>
    );
  }
function renderTwitter(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
        Twitter
        </Tooltip>
    );
}

function renderEmail(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
        Email
        </Tooltip>
    );
}
// window.scrollTo({top: 0, left: 0, behavior: 'smooth' });

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

class DetailArticle extends Component{
    static propTypes = {
        location: PropTypes.object.isRequired,
      }
    removeCommentBox = null;
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            loading: true,
            btnNewScreen: false,
            id: "",
            web_url: "",
            check: JSON.parse(localStorage.getItem('mode')) === 'Guardian' ? true : false,
            Guardian: true,
            showMore: false,
            mark: "\u2228",
            flag: this.checkExist ? 1 : 0,
            modalShow : false,
            title: "",
            exist: this.checkExist ? 1 : 0
            };
        this.removeCommentBox = commentbox(COMMENTBOX_KEY);        

        this.showMoreHandler = this.showMoreHandler.bind(this)
        this.showContent = this.showContent.bind(this)
        this.notify = this.notify.bind(this)
        this.onChanges = this.onChanges.bind(this)
    }
    CheckExist() {
        var dum = 0
        for (let i = 0, l = localStorage.length; i < l; i++) {
            console.log("id inside Check" , this.state.id)
            console.log("Key local Storage" ,localStorage.key(i))
            console.log("Equal? ", this.state.id === localStorage.key(i))
    
            if(localStorage.key(i) === this.state.id) {
                this.setState({flag:1})
                dum = 1
                break
            } else {
                continue
            }
        }
        if(dum !== 1)
            this.setState({flag:0})
    }
    
    notify() { 
        if(this.state.flag === 0) {
            toast(this.state.Guardian? "Saving " + this.state.data.webTitle: 
                "Saving " + this.state.data.docs[0].headline.main, {
                    className: css({
                        color: "black !important"
                    })
                });
            this.store(this.state.data)
            
            this.setState({flag:1})
        } else {
            toast(this.state.Guardian? "Removing " + this.state.data.webTitle: 
                "Removing " + this.state.data.docs[0].headline.main, {
                    className: css({
                        color: "black !important"
                    })
                });
            this.remove(this.state.id)
            this.setState({flag:0})

        }
    }

    store(obj) { 
        this.state.Guardian? 
            localStorage.setItem(obj.id, JSON.stringify({
            'id':obj.id,
            'titles': obj.webTitle,
            'date': obj.webPublicationDate,
            'img':obj.url_Link,
            'section': obj.sectionId,
            'desc': obj.blocks.body[0].bodyTextSummary,
            'shortDesc': obj.short_desc,
            'source': 'Guardians',      
            'direct': obj.webUrl,
            'desc_Link': "/DetailArticle?id=" + this.state.id})) :
        
            localStorage.setItem(obj.docs[0]._id, JSON.stringify({
            'id':obj.docs[0]._id,
            'titles': obj.docs[0].headline.main,
            'date': obj.docs[0].published_date,
            'img':obj.docs[0].url_Link,
            'section': obj.docs[0].section_name,
            'desc': obj.docs[0].abstract,
            'shortDesc': obj.docs[0].short_desc,
            'source': 'NY',
            'direct': this.state.web_url,
            'desc_Link': "/DetailArticle?id=" + this.state.id + '&web_url=' +this.state.web_url})) 

    }
    remove(key) {
        localStorage.removeItem(key);
    }
    async componentDidMount() {

        const {location} = this.props
        this._isMounted = true;
        const query = parse(location.search.substr(1))
        var url = '';
        if(query.web_url) {
            url = "/DetailArticle?id=" + query.id + '&web_url=' +query.web_url;
            this.setState({Guardian: false})
            this.setState({check:false})
        } else {
            url = "/DetailArticle?id=" + query.id;
            this.setState({Guardian: true})
            this.setState({check:true})
        }
        const response = await fetch(url);
        const data = await response.json();

        this.setState({data: data.temp});
        this.setState({loading: false})

        query.web_url ? this.setState({id: data.temp.docs[0]._id}) : 
                        this.setState({id:data.temp.id})

        query.web_url ? this.setState({web_url: query.web_url}) : 
                        this.setState({web_url: data.temp.webUrl})

        query.web_url ? this.setState({title: data.temp.docs[0].headline.main}) : 
                        this.setState({title: data.temp.webTitle})
        
        this.CheckExist()

        console.log("State_Check", this.state.check);
        console.log("State_Check", this.state.id);
        console.log("State_Check_web_url", this.state.web_url);
        console.log("State id", this.state.id)
        console.log("State Title", this.state.title)
        console.log("State Exist", this.state.exist)
        console.log("State Flag", this.state.flag)
        
    }


    componentWillUnmount() {
        this._isMounted = false;
        this.removeCommentBox();
    }

    showMoreHandler() {
        if(this.state.showMore) {
            this.setState({mark : '\u2228'})
        } else {
            this.setState({mark : "\u2227"})
        }
        this.setState(prevState => ({            
            showMore: !prevState.showMore
          }));
    }
    showContent() {
        if(this.state.showMore) {
            return this.state.data.blocks.body[0].bodyTextSummary
        } else {
            return this.state.data.short_desc
        }
    }

    showContentNY() {
        if(this.state.showMore) {
            return this.state.data.docs[0].abstract
        } else {
            return this.state.data.docs[0].short_desc
        }

    }

    elementDidMount = (elem) => {
        console.log(123123);
        this.removeCommentBox = commentbox(COMMENTBOX_KEY);
    }

    onChanges() {
      this.props.changeLink()
    }
    changeMark(flag) {
        if(flag === 1) {
            return <FaRegBookmark className = "bookmark" onClick= {this.notify}/>
        } else {
            return <FaBookmark className = "bookmark" onClick= {this.notify}/>}            
        }

    render() {
        console.log("Guardian",this.state.Guardian)
        console.log(this.props.checked)    
        console.log("Storage Length",localStorage.length);

        const {
            data,
        } = this.state;

        const isComponentReady = Object.keys(data).length > 0;
        return (
                <div className={"commentbox"} id={"1234-2"} ref={this.elementDidMount}></div>
        )
        // if (!this.state.loading && isComponentReady) {         
        //     return (    
        //         <div>
        //          <ToastContainer
        //             position="top-center"
        //             autoClose={5000}
        //             hideProgressBar
        //             newestOnTop={false}
        //             closeOnClick
        //             rtl={false}
        //             pauseOnVisibilityChange
        //             draggable
        //             pauseOnHover
        //             className='toaster'
        //         />

        //         <Form_No_Switch/>
        //         <div className='custom-control custom-switch'>

        //             <div className={"container-fluid"} >
        //                 <div className={"row"}>
        //                 <div className="col-12 mt-3">
        //                     <div className="card">
        //                         <div className="card-veritical">
        //                             <div className = "titles">
        //                                  <h4 className="card-title">{this.state.Guardian? this.state.data.webTitle: this.state.data.docs[0].headline.main}</h4>
        //                                  {this.state.Guardian? this.state.data.webPublicationDate: this.state.data.docs[0].published_date}

        //                                  {this.state.flag ?  <FaBookmark className = "bookmark" onClick= {this.notify} style={{float:"right", fontSize: 30}}/> :
        //                                                     <FaRegBookmark className = "bookmark" onClick= {this.notify} style={{float:"right", fontSize: 30}}/>}
        //                                 <OverlayTrigger
        //                                     placement="top"
        //                                     delay={{ show: 250, hide: 400 }}
        //                                     overlay={renderEmail()}
        //                                     >
        //                                 <EmailShareButton url={this.state.web_url} title={this.state.title} subject = '#CSCI_571_NewsApp' style={{float:"right"}}>
        //                                     <EmailIcon classNme= 'btn btn-circle' size={30} round={true}> </EmailIcon>
        //                                 </EmailShareButton>
        //                                 </OverlayTrigger>                                        

        //                                 <OverlayTrigger
        //                                     placement="top"
        //                                     delay={{ show: 250, hide: 400 }}
        //                                     overlay={renderTwitter()}
        //                                     >
        //                                 <TwitterShareButton url={this.state.web_url} title={this.state.title} hashtags = {['CSCI_571_NewsApp']} style={{float:"right"}}>
        //                                     <TwitterIcon classNme= 'btn btn-circle' size={30} round={true}> </TwitterIcon>
        //                                 </TwitterShareButton>
        //                                 </OverlayTrigger>

        //                                  <OverlayTrigger
        //                                     placement="top"
        //                                     delay={{ show: 250, hide: 400 }}
        //                                     overlay={renderFacebook()}
        //                                     >
        //                                  <FacebookShareButton url={this.state.web_url} title={this.state.title} hashtag = '#CSCI_571_NewsApp' style={{float:"right"}}>
        //                                     <FacebookIcon classNme= 'btn btn-circle' size={30} round={true}> </FacebookIcon>
        //                                 </FacebookShareButton>
        //                                 </OverlayTrigger>


        //                             </div>
        //                             <div className="img-square-wrapper">
        //                                 <img id = "detailImg" src={this.state.Guardian? this.state.data.url_Link: this.state.data.docs[0].url_Link} alt="Card image cap"/>
        //                             </div>
        //                             <div className="description">
        //                                 {this.state.Guardian? this.showContent(): this.showContentNY()}
        //                                 <strong id = 'dropdown' onClick = {this.showMoreHandler}>{this.state.mark}</strong>

        //                             </div>
        //                             {/* <Comment idx={this.state.web_url}/> */}
        //                             {/* <div>
        //                                 <div className={"commentbox"} id={this.state.web_url} ref={this.elementDidMount.bind(this)}></div>
        //                             </div> */}

        //                             <div className={"commentbox"} id={"1234"} ref={this.elementDidMount}></div>

        //                         </div>
        //                     </div>                                      
        //                 </div>
        //                 </div>
        //                 <div className={'row'}>
        //                     <div className={'col-12'}>
        //                     </div>
        //                 </div>

        //             </div>
        //         </div>
        //     </div>    
     
        //     )
        // } else {
        //     return (      
        //     <div className="sweet-loading">
        //         <BounceLoader className='boundceLoader'
        //         size={100}
        //         color={"#123abc"}
        //         loading={this.state.loading}
        //         />
        //         <h2>Loading</h2>

        //     </div>
        //   )
        // }    
    }

}
export default withRouter(DetailArticle)
