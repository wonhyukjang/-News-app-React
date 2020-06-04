import React, {Component} from "react";
import CardComponent from './CardComponent'
import Form_Main from './Form_Main'
export default class Card extends Component {
    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
        this.state = {
            data: [],
            loading: true,
            btnNewScreen: false
        };
    }

    handler() {
        this.setState({
            btnNewScreen: true
        });
        this.props.changeLink()            

    }
    async componentDidMount() {
        const url = "/NY_Home";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({data: data.temp});
        this.setState({loading: false})

        console.log(data.temp);
    }
    changeButtonState(event) {
        this.setState({btnNewScreen: !this.state.btnNewScreen})
    }
    render() {
        if (!this.state.loading){
            const cardItems = this.state.data.map(news => <CardComponent key = {news.id} news = {news}/>)
            console.log("CardItem",cardItems)
            return (            
                <div>
                    <Form_Main changeLink={this.handler.bind(this)} check={this.props.check}/>
                    {cardItems}
                </div>
            )
        } else {
            return (<div>Loading...</div>)
        }
    }
}