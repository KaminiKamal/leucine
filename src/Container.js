import React, { Component } from 'react'
import FormContainer from './container/FormContainer';
import LeftPanel from './container/LeftPanel';
import BottomBar from './container/BottomBar';

export default class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateNow: false,
        }
    }
    signalToUpdate(){
        this.setState({updateNow: true})
        //console.log("signalToUpdate")
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="container-box">
                    <LeftPanel />
                    <FormContainer messageToSubmit={this.state.updateNow} />
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-slick"></div>
                    <BottomBar signalToUpdate={this.signalToUpdate.bind(this)} />
                </div>
                
            </div>
            
        )
    }
}
