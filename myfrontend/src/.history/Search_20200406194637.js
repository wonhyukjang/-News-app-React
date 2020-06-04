import React, {Component} from "react";
import {parse} from 'qs'
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import SearchComponent from "./SearchComponent"

class Search extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        // this.handler = this.handler.bind(this)
        this.state = {
            data        : [],
            loading     : true,
            btnNewScreen: false,
            check       : JSON.parse(localStorage.getItem('mode')) === 'Guardian',
            id          : "",
            start       : false

        };
    }

    async componentDidMount() {

        const {location} = this.props

        const query = parse(location.search.substr(1))
        var url = ''
        if (this.state.check)
            url = 'Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Search?id=' + query.q + '&source=guardian';
        else
            url = 'Nodeserver-env-1.eba-4mmhkpip.us-west-2.elasticbeanstalk.com/Search?id=' + query.q + '&source=ny';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({data: data.temp});
        this.setState({loading: false})
        this.setState({id: query.id})
    }
    componentWillUnmount() {
        if(this.state.start === this.props.start) {
            this.props.showSwitch()
            // this.props.setSearch("")
        }

    }

    render() {
        console.log("PROPS START: ",this.props.start)
        if(window.location.pathname === '/search' || window.location.pathname === '/article' || window.location.pathname === '/favorites'){
            if(this.state.start !== this.props.start) {
                this.props.changeSwitch()
            }

        }

        if (!this.state.loading) {

            var searchItems = this.state.data.map(news => <SearchComponent key={news.id} news={news}/>)
            if (searchItems.length === 0) {
                searchItems = 'No Result'
            }

            return (
                <div>
                    <div className={"container-fluid p-3"}>

                        <h5 className={"text-left m-3"} style={{fontWeight:400, fontSize:30}}>
                            Results
                        </h5>

                        <div className={"row mx-3"} >
                            {searchItems}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div>
                        <div className={"container-fluid p-3"}>
                        <h5 className={"text-left m-3"} style={{fontWeight:400, fontSize:30}}>
                            Results
                        </h5>

                </div></div>)
        }
    }
}

export default withRouter(Search)
