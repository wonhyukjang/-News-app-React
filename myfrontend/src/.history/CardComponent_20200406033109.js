import React, {Component} from "react"
import Badges from "./Badges"
import { IoMdShare } from "react-icons/io";
import { Modal} from "react-bootstrap";
import {withRouter} from "react-router";
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    TwitterShareButton,
    FacebookShareButton,
    EmailShareButton,
  } from "react-share";

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


class CardComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            modalShow : false,
            title: this.props.news.title,
            source: this.props.news.source === 'NY'? false : true,
        }
        this.handleClick = this.handleClick.bind(this)
        this.linkPage = this.linkPage.bind(this)
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

    linkPage() {
        if(this.state.source === true) {
            return "/article?id=" + this.props.news.id
        } else {
            return "/article?id=" + this.props.news.id + '&web_url=' + this.props.news.url
        }
    }
    render() {

    return (

        <div class="container-fluid" >
            
            <span class="row">
                <div class="col-12 mt-3">
                    {/* <div class="card"></div> onClick = {()=>{document.location.href = '/article?id=' + this.props.news.id+'&web_url='+this.props.news.url}}> */}
                    <div class="card" onClick={event => this.state.modalShow ? 
                                                                null : 
                                                                this.state.source ?
                                                                    this.props.history.push("/article?id=" + this.props.news.id):
                                                                    this.props.history.push("/article?id=" + this.props.news.id + '&web_url=' + this.props.news.url)                                                        
                                                                }>


                        <div class="card-horizontal">

                            <div class="img-square-wrapper">
                                <img class="cardImg" src={this.props.news.bigUrl} alt="Card image cap"/>
                            </div>

                            <div class="card-body">
                                <div class="card-title" style={{fontWeight: "bold", fontSize:20, fontStyle:"italic"}}>
                                    {this.props.news.title}

                                    <span id= "share" onClick={this.handleClick}><IoMdShare/></span>

                                    
                                    <MyVerticallyCenteredModal
                                    show={this.state.modalShow}
                                    title = {this.props.news.title}
                                    url = {this.props.news.url}
                                    onHide={() => this.setState({modalShow:false})}
                                    />

                                </div>
                                <p class="card-text" >{this.props.news.abstract}</p>
                                <p class="card-date">
                                    <span style={{fontStyle:'italic', color: rgb(5, 87, 87), fontWeight:500}}>{this.props.news.published_date}</span>
                                    <Badges style={{marginTop:4}}badge = {this.props.news.section.length > 0 ? this.props.news.section : ""}/>
                                </p>
                            </div>
                        </div>
                        {/* </a> */}
                    </div>
                </div>
            </span>
        </div>
    )
}
}
export default withRouter(CardComponent)
