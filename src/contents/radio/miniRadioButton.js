import React, { Component } from 'react'

export default class MiniRadioButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: "",
            type: (this.props && this.props.type ? this.props.type : "text"),
            label: (this.props && this.props.label ? this.props.label : ""),
            isRequired: (this.props && this.props.isRequired ? this.props.isRequired: false)
        }
    }
    
    render(){
        return(
            <div className={(this.props.addClass ? this.props.addClass : `input-box-container`)}>
                <label><span className="mandatory-label">{this.props.isRequired ? `*` : null}</span>{this.state.label}</label>
                <input 
                    type="radio" 
                    className={(this.props.addInputStyle ? this.props.addInputStyle : `input-box`)}
                    ref="input"
                    name="mini_radio"
                    value={this.props.label}
                    id="mini_radio"
                    onClick={(e) => {this.props.updateValue(e.target.value)}}
                    //onBlur={this.props.updateValue}
                />
               
            </div>
        )
    }
}
