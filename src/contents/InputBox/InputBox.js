import React from  'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './InputBox.scss';
import '../../App.scss';

class InputBox extends React.Component{
    static propTypes = {
        type: PropTypes.oneOf(["text", "number"]),
        label: PropTypes.string,
        isRequired: PropTypes.oneOf([true, false])
        //prop: PropTypes
    }
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
                    required={true}
                    type="text" 
                    className={(this.props.addInputStyle ? this.props.addInputStyle : `input-box`)}
                    ref="input"
                    onBlur={this.props.updateValue}
                />
            </div>
        )
    }
}

export default InputBox;