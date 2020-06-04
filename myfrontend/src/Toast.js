import React, {Component} from "react"
class Toast extends Component{
    render() {
        return (
            <Toast>
                <Toast.Header>
                    <strong className="mr-auto">Bootstrap</strong>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast>
        )
    }
}
export default Toast