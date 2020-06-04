import React, {Component} from "react"
import Badges from "./Badges"
import { IoMdShare } from "react-icons/io";
import { Modal} from "react-bootstrap";
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    TwitterShareButton,
    FacebookShareButton,
    EmailShareButton,
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
      <Modal
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
            
            <div>
                <FacebookShareButton url={props.url} title={props.title} hashtag = '#CSCI_571_NewsApp' style={{marginLeft:100}}>
                    <FacebookIcon classNme= 'btn btn-circle' size={70} round={true}> </FacebookIcon>
                </FacebookShareButton>

                <TwitterShareButton url={props.url} title={props.title} hashtags = {['CSCI_571_NewsApp']} style={{marginLeft:180}}>
                    <TwitterIcon classNme= 'btn btn-circle' size={70} round={true}> </TwitterIcon>
                </TwitterShareButton>
                <EmailShareButton url={props.url} title={props.title} subject = '#CSCI_571_NewsApp' style={{marginLeft:150}}>
                    <EmailIcon classNme= 'btn btn-circle' size={70} round={true}> </EmailIcon>
                </EmailShareButton>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

class CardComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            modalShow : false,
            title: this.props.news.title
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
                    <div class="card">
                    <a href={'/DetailArticle?id=' + this.props.news.id+'&web_url='+this.props.news.url}>

                        <div class="card-horizontal">

                            <div class="img-square-wrapper">
                                <img class="cardImg" src={this.props.news.bigUrl} alt="Card image cap"/>

                            </div>
                            {/* </Link> */}

                            <div class="card-body">
                                <h4 class="card-title">
                                    {this.props.news.title}

                                    <span id= "share" onClick={this.handleClick}><IoMdShare/></span>

                                    
                                    <MyVerticallyCenteredModal
                                    show={this.state.modalShow}
                                    title = {this.props.news.title}
                                    url = {this.props.news.url}
                                    onHide={() => this.setState({modalShow:false})}
                                    />

                                </h4>
                                <p class="card-text">{this.props.news.abstract}</p>
                                <p class="card-date">
                                    {this.props.news.published_date}
                                    <Badges badge = {this.props.news.section}/>
                                </p>
                            </div>
                        </div>
                        </a>
                    </div>
                </div>
            </span>
        </div>
    )
}
}
export default CardComponent