import React, {Component} from "react"
import queryString from "query-string";
import { parse } from 'qs'
import { useLocation, } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import commentbox from 'commentbox.io';
import axios from "axios";
const COMMENTBOX_KEY = '5737781481439232-proj'

class test extends Component{

    constructor(props) {
        super(props);
        const paramId = new URLSearchParams(window.location.search).get('id');

    this.state = {
        description    : '',
        descriptionPart: '',
        id             : paramId,
        imageUrl       : '',
        isBookmark     : false,
        isExpand       : false,
        publishDate    : '',
        title          : '',
        sectionId      : '',
        selectAPI      : !paramId.startsWith('http'),
        setDisplay     : setDisplay,
    }
    this.removeCommentBox = commentbox(COMMENTBOX_KEY);        
}
    elementDidMount() {
        this.removeCommentBox = commentbox(COMMENTBOX_KEY);
    }

    componentDidMount() {
        this._isMounted = true;
        this.state.setDisplay(false);
        const {id, selectAPI} = this.state;
        this.removeCommentBox = commentbox(COMMENTBOX_KEY);
        axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(%22https://www.nytimes.com/2020/03/25/world/coronavirus-news-live.html%22)&api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy', {
            params: {
                id       : id
            }
        }).then(res => {
            const result = res.data;
            console.log(result);
            this.setState({
                description    : result.description,
                imageUrl       : result.imageUrl,
                publishDate    : result.publishDate,
                title          : result.title,
                url            : result.url,
                sectionId      : result.sectionId,
                descriptionPart: result.descriptionPart,
                isBookmark     : this.checkLocalStorage(),
                isLoaded       : true,
            });
        });
    }


}
export default test