import React, {Component} from "react";
import FavoriteComponent from './FavoriteComponent'
import {toast, ToastContainer} from 'react-toastify';
import {css} from 'glamor'
import { FaWindows } from "react-icons/fa";

function getLocalItems(k) {
    if (k) {
        try {
            return JSON.parse(localStorage.getItem(k))
        } catch (e) {
            return "Error"
        }
    }
}


export default class Favorites extends Component {
    constructor() {
        super()
        this.handler = this.handler.bind(this)
        this.state = {
            data        : [],
            loading     : true,
            btnNewScreen: false,
            toastMsg    : "",
            empty       : false,
            clicked     : true,
            lastItem    : "",
            start       : false

        };
        this.changeButtonState = this.changeButtonState.bind(this)
        this.handler = this.handler.bind(this)
        this.notify = this.notify.bind(this)
    }

    handler(arg) {
        this.setState({
            toastMsg: arg
        });
    }

    handlerLast(arg) {
        this.setState({
            toastMsg: arg
        });
    }

    changeButtonState(event) {
        this.setState({btnNewScreen: !this.state.btnNewScreen})
    }

    delete(id) {

    }

    notify(title) {
        this.toastId = toast("Removing " + title, {
            className: css({
                color: "black !important"
            })
        });
    }
    componentWillUnmount() {
        if(this.state.start === this.props.start) {
            this.props.showSwitch()
        }

    }
    render() {
        // if (!this.state.loading){
        // const cardItems = this.state.data.map(news => <CardComponent key = {news.id} news = {news}/>)
        console.log("PROPS START: ",this.props.start)
        if(window.location.pathname === '/search' || window.location.pathname === '/article' || window.location.pathname === '/favorites'){
            this.props.changeSwitch()
        }
        // if(this.state.start !== this.props.start) {
        // }

        var store = []
        for (let i = 0, l = localStorage.length; i < l; i++) {
            // if(localStorage.key(i) !== 'mode') {
            //     var dummy = getLocalItems(localStorage.key(i))
            // } else {
            //     break
            // }
            if (localStorage.key(i) === 'mode') {
                continue
            } else {
                var dummy = getLocalItems(localStorage.key(i))
                var ind = {}
                ind['id'] = localStorage.key(i)
                ind['titles'] = dummy['titles']
                ind['date'] = dummy['date']
                ind['img'] = dummy['img']
                ind['section'] = dummy['section']
                ind['desc'] = dummy['desc']
                ind['shotDesc'] = dummy['shortDesc']
                ind['source'] = dummy['source']
                if (dummy['direct'])
                    ind['url'] = dummy['direct']
                else
                    ind['url'] = null
                store.push(ind)

            }
        }

        this.state.data = store
        if (localStorage.length === 0) {
            return (<div>{'You have no saved articles'}</div>)
        } else {
            console.log("Data", this.state.data)
            var favoriteItem = this.state.data.map(news => <FavoriteComponent key={news.id} news={news} toast={this.handler.bind(this)}/>)
            if (favoriteItem.length === 0) {
                favoriteItem = "You have no saved articles"
            }
            if (this.state.toastMsg) {
                console.log("Msg", this.state.toastMsg)
                this.notify(this.state.toastMsg)
            }
            console.log("FavoriteItem: ", {favoriteItem})
            return (

                <div>
                    {
                        // localStorage.length !== 1 ?
                        <div class="container-fluid p-3">
                            {
                                localStorage.length !== 1 ?
                                    <h3 class="text-left m-3">
                                        Favorites
                                    </h3> : null
                            }
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnVisibilityChange
                                draggable
                                className='toaster'/>
                            {
                                localStorage.length !== 1 ?
                                    <div class="row mx-3">
                                        {favoriteItem}
                                    </div> :
                                    <div style={{textAlign: "center", fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
                                        {favoriteItem}
                                    </div>

                            }
                        </div>

                        //     : 
                        //     <div>
                        //     {/* {this.notify(this.state.lastItem)} */}
                        //       <ToastContainer
                        //             position="top-center"
                        //             autoClose={5000}
                        //             hideProgressBar
                        //             newestOnTop={false}
                        //             closeOnClick
                        //             rtl={false}
                        //             pauseOnVisibilityChange
                        //             draggable
                        //             className='toaster'/>

                        //         <div style={{textAlign: "center", fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
                        //             {favoriteItem}
                        //         </div>
                        //     </div>
                    }
                </div>
            )
        }
    }
}
