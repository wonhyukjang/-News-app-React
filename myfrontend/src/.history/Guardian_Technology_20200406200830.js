import React, {Component} from "react";
import Form_Main from './Form_Main'
import CardComponent_Guardians from './CardComponent_Guardians'
import BounceLoader from "react-spinners/BounceLoader";

export default class Guardian_Technology extends Component {
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
        const url = "http://Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Guardian_Technology";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({data: data.temp});
        this.setState({loading: false})

    }
    changeButtonState(event) {
        this.setState({btnNewScreen: !this.state.btnNewScreen})
    }
    render() {
        if (!this.state.loading){
            const cardItems = this.state.data.map(news => <CardComponent_Guardians key = {news.id} news = {news}/>)
            
            return (            
                <div>
                    {/* <Form_Main changeLink={this.handler.bind(this)} check={this.props.check}/> */}
                    {cardItems}
                </div>
            )
        } else {
            return (    
                <div>  
                    {/* <Form_Main changeLink={this.handler.bind(this)} check={this.props.check} expand = {true}/>                     */}

                    <div class="d-flex flex-column bd-highlight mb-3 justify-content-center align-items-center" style={{height: 600}}>
                        <div class="p-2 bd-highlight">                
                            <BounceLoader className='boundceLoader'
                                            size={90}
                                            color={"#123abc" }
                                            loading={this.state.loading}
                                            />
                        </div>
                        <div class="p-2 bd-highlight"><h1 style={{marginLeft: 25}}>loading...</h1></div>
                    </div>
                </div>
          )
        }
    }
}