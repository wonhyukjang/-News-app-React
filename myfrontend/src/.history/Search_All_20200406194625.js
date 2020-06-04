import React, {Component} from "react";
import BounceLoader from "react-spinners/BounceLoader";


export default class Search_All extends Component {
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
        const guardian_Url = 'Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Search?id=corona&source=guardian';
        const response = await fetch(guardian_Url);
        const data = await response.json();
        this.setState({data: JSON.stringify(data.temp)});

        const ny_Url = 'Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Search?id=corona&source=ny';
        const response2 = await fetch(ny_Url);
        const data2 = await response2.json();
        this.setState({data2: JSON.stringify(data2.temp)});
        this.setState({loading: false})

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