import React from 'react';
import commentBox from 'commentbox.io';
import { parse } from 'qs'
import qs from 'qs';
import PropTypes from "prop-types";

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.idx,
        }
    }
    elementDidMount() {
        this.removeCommentBox = commentBox('5661504607092736-proj');
    }

    componentDidMount() {
        this.setState({id: this.props.idx})
        this.removeCommentBox = commentBox('5661504607092736-proj');
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {

        return (
            <div className={"commentbox"} id={this.props.idx} ref={this.elementDidMount.bind(this)}/>
        );
    }
}
export default Comment;