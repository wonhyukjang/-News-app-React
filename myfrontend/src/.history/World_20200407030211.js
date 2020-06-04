import React, {Component} from "react";
import Form_Main from './Form_Main'
import CardComponent_Guardians from './CardComponent_Guardians'
import BounceLoader from "react-spinners/BounceLoader";
import Word_Card from "./Word_Card"
import Guardian_World from "./Guardian_World"


export default class World extends Component {
    constructor() {
        super()
        this.handler = this.handler.bind(this)
        this.state = {
            check: this.props.check
        };
    }
    render () {
        return (
            this.state.check ?<Guardian_World changeLink={this.props.changeLink.bind(this)} check={this.state.check}/>:
                            <Word_Card changeLink={this.props.changeLink.bind(this)} check={this.state.check}/>
        )
    }
}
