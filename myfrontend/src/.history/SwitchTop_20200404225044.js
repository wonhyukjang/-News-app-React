import React, { Component } from "react";
import Switch from "react-switch";
 
class SwitchTop extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: JSON.parse(localStorage.getItem('mode')) === 'Guardian' ? true : false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {

    var dum = JSON.parse(localStorage.getItem('mode'))
    if(dum === 'Guardian') {
      // localStorage.removeItem('mode')
      localStorage.setItem('mode', JSON.stringify('NY'))
    } else {
      // localStorage.removeItem('mode')
      localStorage.setItem('mode', JSON.stringify('Guardian'))
    }
    this.setState(prevState => ({
      checked: JSON.parse(localStorage.getItem('mode')) === 'Guardian' ? true : false

    }));
    this.props.changeLink();
    this.props.changeExpand();
  }
changeSwitch() {
  var dum = JSON.parse(localStorage.getItem('mode'))
  if(dum === 'Guardian') {
    // localStorage.removeItem('mode')
    localStorage.setItem('mode', JSON.stringify('NY'))
  } else {
    // localStorage.removeItem('mode')
    localStorage.setItem('mode', JSON.stringify('Guardian'))
  }
}
  render() {
    console.log("Switch state", this.state.checked)

    return (
      
        <label htmlFor="material-switch">
          <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
            onColor="#2088d6"
            offColor="#e9f1f7"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </label>    
      );
  }
}
export default SwitchTop