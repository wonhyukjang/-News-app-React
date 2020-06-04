import React, {Component} from "react";
import BounceLoader from "react-spinners/BounceLoader";


export default class Article_All extends Component {
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

        const url = "https://Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/article?id=0&web_url=https://www.nytimes.com/2020/04/06/world/coronavirus-live-news-updates.html";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({data: JSON.stringify(data.temp)});

        const url2 = "https://Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/article?id=sport/blog/2020/apr/07/talking-horses-a-win-for-the-north-as-brian-hughes-is-champion-jockey";
        const response2 = await fetch(url2);
        const data2 = await response2.json();
        this.setState({data2: JSON.stringify(data2.temp)});

        this.setState({loading: false})
    }

    
    render() {
        console.log("Start State Guardian ",this.state.start)
        console.log("Start props State Guardian ",this.props.start)
        console.log(this.state.data)

        if (!this.state.loading) {
            return (
                <div>
                    ###################################### NY Search: https://www.nytimes.com/2020/04/06/world/coronavirus-live-news-updates.html #########################################
                    <br></br>
                        {this.state.data}
                        <br></br>
                    ###################################### GUARDIAN SEARCH : talking-horses-a-win-for-the-north-as-brian-hughes-is-champion-jockey #########################################
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