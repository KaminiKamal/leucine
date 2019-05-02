import React from  'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Button.scss';
import '../../App.scss';

class Button extends React.Component{
    static propTypes = {
        type: PropTypes.oneOf(["button"]),
        label: PropTypes.string,
        isRequired: PropTypes.oneOf([true, false])
        //prop: PropTypes
    }
    constructor(props){
        super(props);
        this.state = {
            value: "",
            type: (this.props && this.props.type ? this.props.type : "button"),
            label: (this.props && this.props.label ? this.props.label : ""),
            isRequired: (this.props && this.props.isRequired ? this.props.isRequired: false)
        }
    }
    
    render(){
        return(
            <div className={(this.props.addClass ? this.props.addClass : `button-box-container`)}>
                <input 
                    type="button" 
                    className={(this.props.addInputStyle ? this.props.addInputStyle : ``)}
                    value={this.state.label}
                    onClick={this.props.updateFinalValue}
                    style={{cursor: 'pointer'}}
                />
            </div>
        )
    }
}

export default Button;