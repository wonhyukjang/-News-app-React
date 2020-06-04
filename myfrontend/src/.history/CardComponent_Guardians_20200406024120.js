import React, {Component,useState,Row,Col} from "react"
import Badges from "./Badges"
import { Link } from 'react-router-dom';
import { IoMdShare } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import BounceLoader from "react-spinners/BounceLoader";
import {withRouter} from "react-router";

import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    ShareButtons, 
    TwitterShareButton,
    FacebookShareButton,
    EmailShareButton,
    ShareCounts, 
    generateShareIcon
  } from "react-share";

//   const {
//     FacebookShareButton,
//     GooglePlusShareButton,
//     LinkedinShareButton,
//     TwitterShareButton,
//     PinterestShareButton,
//     VKShareButton,
// } = ShareButtons;
function MyVerticallyCenteredModal(props) {
    return (
      <Modal className='custom-dialog'
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        top
      >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {props.title}
            </Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <div id='shareText'style={{fontWeight:'bold'}}>Share Via</div>
                
                <div class="row">
                        <div class="col-4 text-center">
                            <span style={{cursor:'pointer'}} onClick={() => window.open("https://www.facebook.com/sharer/sharer.php?u="
                                        + props.url + "&hashtag=%23CSCI_571_NewsApp", 'blink')}>
                                        <FacebookIcon round/>
                            </span>
                        </div>

                        <div class="col-4 text-center">
                            <span style={{cursor: 'pointer'}} onClick={() => window.open('https://twitter.com/intent/tweet?url=%23&text=' 
                                        + props.url + '%20%23CSCI_571_NewsApp', '_blink')}>
                                        <TwitterIcon round/>
                            </span>
                        </div>

                        <div class="col-4 text-center">
                            <span style={{cursor: 'pointer'}} onClick={() => window.open('mailto:?subject=%23CSCI_571_NewsApp&body=' 
                                        + props.url, '_blink')}>
                                        <EmailIcon round/>
                            </span>
                        </div>
                </div>
            </Modal.Body>
      </Modal>
    );
  }


class CardComponent_Guardians extends Component{
    constructor(props) {
        super(props)
        this.state = {
            modalShow : false,
            title: this.props.news.webTitle,
            source: this.props.news.source === 'NY'? false : true

        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.nativeEvent.stopImmediatePropagation();

        e.stopPropagation();
        e.preventDefault();
        this.setState({modalShow:true})
        e.stopPropagation();
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
      }

    render() {

    return (

        <div class="container-fluid" >
            
            <span class="row">
                <div class="col-12 mt-3">
                    <div class="card" onClick={event => this.state.modalShow ? 
                                                                null : 
                                                                this.state.source ? 
                                                                this.props.history.push('/article?id=' + this.props.news.id):
                                                                this.props.history.push("/article?id=" + this.props.news.id + 
                                                                '&web_url=' + this.props.news.url)}>

                        <div class="card-horizontal">

                            <div class="img-square-wrapper">
                                <img class="cardImg" src={this.props.news.bigUrl} alt="Card image cap"/>

                            </div>
                            {/* </Link> */}

                            <div class="card-body">
                                <div class="card-title" style={{fontWeight: "bold", fontSize:20, fontStyle:"italic"}}>
                                    {this.props.news.webTitle}

                                    <span id= "share" onClick={this.handleClick}><IoMdShare/></span>

                                    <MyVerticallyCenteredModal
                                    show={this.state.modalShow}
                                    title = {this.props.news.webTitle}
                                    url = {this.props.news.webUrl}
                                    onHide={() => this.setState({modalShow:false})}
                                    />

                                </div>
                                <p class="card-text">{this.props.news.blocks.body[0].bodyTextSummary}</p>
                                <p class="card-date">
                                    <span style={{fontStyle:'italic'}}>{this.props.news.webPublicationDate}</span>
                                    <span style={{marginTop:2}}><Badges  badge = {this.props.news.section.length > 0 ? this.props.news.section: ""}/></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        </div>
    )
}
}
export default withRouter(CardComponent_Guardians)
