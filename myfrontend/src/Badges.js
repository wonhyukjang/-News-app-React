import React,{Component} from "react"
import {Badge} from 'react-bootstrap';

class Badges extends Component{
    render() {
        if(this.props.badge.toLowerCase() === 'world') {
            return (
                <Badge style={{backgroundColor: '#7703fc'}} id= "badge">{this.props.badge.toUpperCase()}</Badge>
            )
        } else if(this.props.badge.toLowerCase() === 'politics') {
            return (
                <Badge style={{backgroundColor: '#A29999'}} id= "badge">{this.props.badge.toUpperCase()}</Badge>
            )
        } else if(this.props.badge.toLowerCase() === 'business') {
            return (
                <Badge style={{backgroundColor: '#5fbcf5'}} id= "badge">{this.props.badge.toUpperCase()}</Badge>
            )
        } else if(this.props.badge.toLowerCase() === 'technology') {
            return (
                <Badge className= 'tech' id= "badge">{this.props.badge.toUpperCase()}</Badge>
            )
        } else if(this.props.badge.toLowerCase() === 'sports') {
            return (
                <Badge className='sports' id= "badge">{this.props.badge.toUpperCase()}</Badge>
            )
        } else if(this.props.badge.toLowerCase() === 'nytimes') {
            return (
                <Badge className='news' variant="light" id= "badge">{this.props.badge.toUpperCase()}</Badge>
            )
        } else if(this.props.badge.toLowerCase() === 'guardians') {
            return (
                <Badge className = 'news' style={{backgroundColor: '#404040'}} id= "badge">{this.props.badge.toUpperCase()}</Badge>

            )
        }
        
        else {
            return (
                <Badge className='times' id= "badge">{this.props.badge.toUpperCase()}</Badge>
            )
        }
    }
}
export default Badges;