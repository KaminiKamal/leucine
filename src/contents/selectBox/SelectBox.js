import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SelectBox.scss';
import _ from 'lodash';

export default class SelectBox extends Component {
    static propTypes = {
        type: PropTypes.oneOf(["select"]),
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
    
    render() {
        return (
            <div className={(this.props.addClass ? this.props.addClass : `input-box-container`)}>
                <label><span className="mandatory-label">{this.props.isRequired ? `*` : null}</span>{this.state.label}</label>
                <select className={(this.props.addInputStyle ? this.props.addInputStyle : `select-box`)} ref="input" required={true} onChange={this.props.updateValue}>
                    <option>--Select--</option>
                    {
                        _.map(this.props.options, (el, i) => (
                            <option value={el.key} key={el._id}>{el.name}</option>
                        ))
                    }
                </select>
            </div>
        )
    }
}
