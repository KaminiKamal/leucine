import React from  'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './InputBox.scss';
import '../../App.scss';

class InputBox extends React.Component{
    static propTypes = {
        type: PropTypes.oneOf(["text", "number"]),
        label: PropTypes.string,
        isRequired: PropTypes.oneOf([true, false]),
        updateValue: PropTypes.func
        //prop: PropTypes
    }
    static defaultProps = {
        type: "text",
        isRequired: false,
        addInputStyle: "input-box",
        addClass: "input-box-container"
    }

    constructor(props){
        super(props);
        this.state = {}
    }
    
    render(){
        return(
            <div className={this.props.addClass}>
                <label><span className="mandatory-label">{this.props.isRequired ? `*` : null}</span>{this.props.label}</label>
                <input 
                    required={this.props.isRequired}
                    type={this.props.type}
                    className={this.props.addInputStyle}
                    ref="input"
                    onBlur={this.props.updateValue}
                />
            </div>
        )
    }
}

export default InputBox;