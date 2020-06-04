import React, {Component,useState,Row,Col} from "react"
import Badges from "./Badges"
import { Link } from 'react-router-dom';
import { IoMdShare, IoMdTrash } from "react-icons/io";
import { Modal, Card} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import {css} from 'glamor'
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    TwitterShareButton,
    FacebookShareButton,
    EmailShareButton,
  } from "react-share";
import { FaItalic } from "react-icons/fa";

//   const {
//     FacebookShareButton,
//     GooglePlusShareButton,
//     LinkedinShareButton,
//     TwitterShareButton,
//     PinterestShareButton,
//     VKShareButton,
// } = ShareButtons;
toast.configure();

function MyVerticallyCenteredModal(props) {
    return (
      <Modal className='custom-dialog'
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div id='shareText'><b>Share Via</b></div>
            
            <div class="row">
                    <div class="col-4 text-center">
                        <FacebookShareButton  url={props.url} title={props.title} hashtag = '#CSCI_571_NewsApp'>
                            <FacebookIcon classNme= 'btn btn-circle' size={70} round={true}> </FacebookIcon>
                        </FacebookShareButton>
                    </div>
                    <div class="col-4 text-center">                 
                        <TwitterShareButton url={props.url} title={props.title} hashtags = {['CSCI_571_NewsApp']}>
                            <TwitterIcon classNme= 'btn btn-circle' size={70} round={true}> </TwitterIcon>
                        </TwitterShareButton>
                    </div>

                    <div class="col-4  text-center">
                    <EmailShareButton url={props.url} title={props.title} subject = '#CSCI_571_NewsApp'>
                        <EmailIcon classNme= 'btn btn-circle' size={70} round={true}> </EmailIcon>
                    </EmailShareButton>
                    </div>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

class TestAlign extends Component{
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            source: this.props.news.source === 'NY'? false : true,
            exist: 0,
            id : this.props.news.id,
            delete: 0,
            empty: 0,
            title: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.RemoveNews = this.RemoveNews.bind(this)
        this.notify = this.notify.bind(this)
    }
    notify(title) { 
        toast("Removing " + title, {
                    className: css({
                        color: "black !important"
                    })
        });
    }

    RemoveNews(e) {
        var dum = 0
        for (let i = 0, l = localStorage.length; i < l; i++) {
            if(localStorage.key(i) === this.state.id) {
                this.setState({flag:1})
                dum = 1
                this.setState({delete: 1})
                this.setState({title: this.props.news.titles})

                localStorage.removeItem(this.state.id);
                e.stopPropagation();
                e.preventDefault();
                this.notify(this.props.news.titles)

                if(localStorage.length === 1) {
                    this.setState({empty: 1})
                }
                break
            } else {
                continue
            }
        }
        if(dum !== 1)
            this.setState({flag:0})
    }
    handleClick(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        this.setState({modalShow:true})
        e.stopPropagation();
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
      }
    
    render() {
        console.log("How many", this.state.empty)
        console.log("LINK: ", this.props.news.direct)
        let cardItem
        this.state.delete ? cardItem = null :
                            cardItem =  
                            <div class = "col-sm-12 col-lg-3 px-1 py-1">
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
                            className='toaster'/>
                            <div class="p-2 shadow card" onClick={event => this.state.modalShow ? 
                                                                            null : 
                                                                            window.location.href=
                                                                                this.state.source ? 
                                                                                '/article?id=' + this.props.news.id:
                                                                                "/article?id=" + this.props.news.id + 
                                                                                '&web_url=' + this.props.news.url}>
                
                            <div class="text-left mt-2 card-title h5" style={{fontStyle: FaItalic}}>
                                <strong class="pr-2">{this.props.news.titles}</strong>
                                <span class="card-text" onClick={this.handleClick}><IoMdShare/></span>
                                <span class="card-text" onClick={this.RemoveNews}><IoMdTrash/></span>
                            </div>
                                <MyVerticallyCenteredModal
                                            show={this.state.modalShow}
                                            title = {this.props.news.titles}
                                            url = {this.props.news.url}
                                            onHide={() => this.setState({modalShow:false})}
                                            />
                                <img class="card-img-border p-2" src={this.props.news.img} ></img>
                                <div class="card-body">
                                
                                    <div class="row">
                                        <div class="col-4 text-left p-0" style={{marginTop:5}}>{this.props.news.date}</div>
                                        <div class="col-8 text-right p-0">
                                        {this.props.news.source === 'NY' ? <Badges badge = {'NYTIMES'} className = 'newsType'/>:
                                                                        <Badges badge = {'GUARDIANS'} className = 'newsType'/>}

                                            <Badges style={{size: 8}} class = "pr-2" badge = {this.props.news.section.length > 0 ? this.props.news.section : ""} className= 'section'/>
                                        {/* </div>
                                        <div class="col-6 text-right p-0"> */}
                                        </div>

                                    </div>
                                </div>
                        </div>
                        </div>
        if(this.state.empty || localStorage.length === 1) {
            cardItem = 
            <div class = "col-sm-12 col-lg-3 px-1 py-1">
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
                    className='toaster'/>
                {"You have no saved articles"}
            </div>            
        }
    return (
           cardItem
    )
}
}
export default TestAlign