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
            data2       : [],
            loading     : true,
            btnNewScreen: false,
            start       : true
        };

    }

    handler() {
        this.setState({
            btnNewScreen: true
        });
    }

    async componentDidMount() {
        var all = []
        const url = "/Guardian_Home";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({data: JSON.stringify(data.temp)});

        const url2 = "/Guardian_World";
        const response2 = await fetch(url2);
        const data2 = await response2.json();
        all.push(data2.temp)

        this.setState({data2: all});
        this.setState({loading: false})
    }

    
    render() {
        console.log("Start State Guardian ",this.state.start)
        console.log("Start props State Guardian ",this.props.start)
        console.log(this.state.data)

        if (!this.state.loading) {
            return (
                <div>
                    <ul>
                        {this.state.data}
                    </ul>
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