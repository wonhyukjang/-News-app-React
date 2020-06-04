import React, {Component} from "react"
import { Modal} from "react-bootstrap";
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    TwitterShareButton,
    FacebookShareButton,
    EmailShareButton,
  } from "react-share";

class ShowModal extends Component{

    MyVerticallyCenteredModal(props) {
        return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
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
    render() {
        return (
            this.MyVerticallyCenteredModal()
        )
    }
}

export default ShowModal;