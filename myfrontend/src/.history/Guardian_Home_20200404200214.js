import React, {Component} from "react";
import CardComponent from './CardComponent'
import Form_Main from './Form_Main'
import CardComponent_Guardians from './CardComponent_Guardians'
import BounceLoader from "react-spinners/BounceLoader";


export default class Guardian_Home extends Component {
    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
        this.state = {
            data        : [],
            loading     : true,
            btnNewScreen: false,
            start       : true
        };
        this.state.start !== this.props.start ? this.props.changeLink(this.state.start): null

    }

    handler() {
        this.setState({
            btnNewScreen: true
        });
    }

    async componentDidMount() {
        const url = "/Guardian_Home";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({data: data.temp});
        this.setState({loading: false})
        // this.props.changeSwitch()
    }

    changeButtonState(event) {
        this.setState({btnNewScreen: !this.state.btnNewScreen})
    }

    
    render() {
        if (!this.state.loading) {
            const cardItems = this.state.data.map(news => <CardComponent_Guardians key={news.id} news={news} expand={this.props.start ? false : true}/>)

            return (
                <div>
                    {/* <Form_Main changeLink={this.handler.bind(this)} check={this.props.check}/> */}

                    {cardItems}
                </div>
            )
        } else {
            
            return (
                <div>
                    <div className={"d-flex flex-column bd-highlight mb-3 justify-content-center align-items-center"} style={{height: 600}}>
                        <div className={"p-2 bd-highlight"}>
                            <BounceLoader className={'boundceLoader'}
                                          size={90}
                                          color={"#123abc"}
                                          loading={this.state.loading}
                            />
                        </div>
                        <div className={"p-2 bd-highlight"}><h1 style={{marginLeft: 25}}>loading...</h1></div>
                    </div>
                </div>
            )
        }
    }
}