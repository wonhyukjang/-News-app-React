import React, {Component} from "react";
import CardComponent from './CardComponent'
import Form_Main from './Form_Main'
import CardComponent_Guardians from './CardComponent_Guardians'
import BounceLoader from "react-spinners/BounceLoader";


export default class Guardian_All extends Component {
    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
        this.state = {
            data        : [],
            data2       : [],
            data3       : [],
            data4       : [],
            data5       : [],
            data6       : [],
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
        const url = "http://Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Guardian_Home";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({data: JSON.stringify(data.temp)});

        const url2 = "http://Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Guardian_World";
        const response2 = await fetch(url2);
        const data2 = await response2.json();
        this.setState({data2: JSON.stringify(data2.temp)});

        const url3 = "http://Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Guardian_Business";
        const response3 = await fetch(url3);
        const data3 = await response3.json();
        this.setState({data3: JSON.stringify(data3.temp)});

        const url4 = "http://Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Guardian_Politics";
        const response4 = await fetch(url4);
        const data4 = await response4.json();
        this.setState({data4: JSON.stringify(data4.temp)});

        const url5 = "http://Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Guardian_Technology";
        const response5 = await fetch(url5);
        const data5 = await response5.json();
        this.setState({data5: JSON.stringify(data5.temp)});

        const url6 = "http://Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Guardian_Sport";
        const response6 = await fetch(url6);
        const data6 = await response6.json();
        this.setState({data6: JSON.stringify(data6.temp)});

        this.setState({loading: false})
    }

    
    render() {
        console.log("Start State Guardian ",this.state.start)
        console.log("Start props State Guardian ",this.props.start)
        console.log(this.state.data)

        if (!this.state.loading) {
            return (
                <div>
                    ###################################### Guardian Home #########################################
                    <br></br>
                        {this.state.data}
                        <br></br>
                    ###################################### Guardian World #########################################
                    <br></br>
                        {this.state.data2}
                        <br></br>
                    ###################################### Guardian Business #########################################
                    <br></br>
                        {this.state.data3}
                        <br></br>
                    ###################################### Guardian Politics #########################################
                    <br></br>
                        {this.state.data4}
                        <br></br>
                    ###################################### Guardian Technology #########################################
                    <br></br>
                        {this.state.data5}
                        <br></br>
                    ###################################### Guardian Sports #########################################
                    <br></br>
                        {this.state.data6}
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