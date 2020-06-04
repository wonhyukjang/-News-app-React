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
        const guardian_Url = '/Search?id=corona&source=guardian';
        const response = await fetch(guardian_Url);
        const data = await response.json();
        this.setState({data: JSON.stringify(data.temp)});

        const ny_Url = '/Search?id=corona&source=ny';
        const response2 = await fetch(ny_Url);
        const data2 = await response2.json();
        this.setState({data2: JSON.stringify(data2.temp)});

    }

    
    render() {

        if (!this.state.loading) {
            return (
                <div>
                    ###################################### NY SEARCH: CORONA #########################################
                    <br></br>
                        {this.state.data}
                        <br></br>
                    ###################################### Guardian SEARCH: CORONA #########################################
                    <br></br>
                        {this.state.data2}
                        <br></br>
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