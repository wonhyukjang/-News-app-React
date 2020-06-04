import React, {Component, useState, Row, Col} from "react"
import Badges from "./Badges"
import {Link} from 'react-router-dom';
import {IoMdShare, IoMdTrash} from "react-icons/io";
import {Modal, Card} from "react-bootstrap";
import {ToastContainer, toast} from 'react-toastify';
import {css} from 'glamor'
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    TwitterShareButton,
    FacebookShareButton,
    EmailShareButton,
} from "react-share";
import {FaItalic} from "react-icons/fa";
import {withRouter} from "react-router";

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
                    <h4 style={{fontWeight: 'bold'}}>{props.source ? "GUARDIAN" : "NY TIMES"}</h4>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id='shareText' style={{fontWeight: 'bold'}}>Share Via</div>
                <div class="row">
                    <div class="col-4 text-center">
                        <span style={{cursor: 'pointer'}} onClick={() => window.open("https://www.facebook.com/sharer/sharer.php?u="
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

class FavoriteComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            source   : this.props.news.source === 'NY' ? false : true,
            exist    : 0,
            id       : this.props.news.id,
            delete   : 0,
            empty    : 0,
            title    : "",
            removed  : 0,
            toastId  : null
        }
        this.handleClick = this.handleClick.bind(this)
        this.RemoveNews = this.RemoveNews.bind(this)
        // this.notify = this.notify.bind(this)
    }

    update = this.props.toast;

    RemoveNews(e) {

        var dum = 0
        var num = 0
        for (let i = 0, l = localStorage.length; i < l; i++) {
            console.log("id inside Check", this.state.id)
            console.log("Key local Storage", localStorage.key(i))
            console.log("Equal? ", this.state.id === localStorage.key(i))
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            e.preventDefault();

            if (localStorage.key(i) === this.state.id) {
                this.setState({flag: 1})
                dum = 1
                this.setState({delete: 1})
                this.setState({title: this.props.news.titles})

                localStorage.removeItem(this.state.id);

                if (localStorage.length === 1) {
                    this.setState({empty: 1})
                }

                this.setState({toastId: this.props.news.titles})
                this.update(this.props.news.titles)

                this.setState({removed: 1})
                num += 1
                break

            } else {
                continue
            }
        }
        if (dum !== 1)
            this.setState({flag: 0})
    }

    handleClick(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        this.setState({modalShow: true})
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
                <div class="col-sm-12 col-lg-3 px-1 py-1">
                    <div class="p-2 shadow card" onClick={event => this.state.modalShow ?
                        null :
                            this.state.source ?
                            this.props.history.push("/article?id=" + this.props.news.id):
                            this.props.history.push("/article?id=" + this.props.news.id + '&web_url=' + this.props.news.url)}>

                        <div class="text-left mt-2 card-title h5" style={{fontStyle: FaItalic}}>
                            <strong class="pr-2" id = 'favoriteTitle'>{this.props.news.titles}</strong>
                            <span class="card-text" onClick={this.handleClick}><IoMdShare/></span>
                            <span class="card-text" onClick={this.RemoveNews}><IoMdTrash/></span>
                        </div>
                        <MyVerticallyCenteredModal
                            show={this.state.modalShow}
                            title={this.props.news.titles}
                            source={this.state.source}
                            url={this.props.news.url}
                            onHide={() => this.setState({modalShow: false})}
                        />
                        <img class="card-img-border p-2" src={this.props.news.img}></img>
                        <div class="card-body">

                            <div class="row">
                                <div class="col-4 text-left p-0" >{this.props.news.date}</div>
                                <div class="col-8 text-right p-0">
                                    {this.props.news.source === 'NY' ? <Badges badge={'NYTIMES'} className='newsType'/> :
                                        <Badges badge={'GUARDIANS'} className='newsType'/>}

                                    <Badges style={{size: 8}} class="pr-2" badge={this.props.news.section ? this.props.news.section : ""} className='section'/>
                                    {/* </div>
                                        <div class="col-6 text-right p-0"> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
        if (this.state.empty || localStorage.length === 1) {
            cardItem =
                <div class="col-sm-12 col-lg-3 px-1 py-1">
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
                    <span>You have no saved articles</span>
                </div>
        }
        return (
            cardItem
        )
    }
}
export default withRouter(FavoriteComponent)