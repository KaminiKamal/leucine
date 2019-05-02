import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './DivButton.scss';

export default class DivButton extends Component {
    static propTypes = {
        text: PropTypes.string,
        updateValue: PropTypes.func
    }
    constructor(props){
        super(props);
        this.state = {
            text: (this.props && this.props.text ? this.props.text : "")
        }
    }
    render() {
        return (//addClass
            <div className={(this.props && this.props.addClass ? this.props.addClass : `nav-btn-container`)} ref="input" onClick={this.props.updateValue.bind(this)}>
                <div className="nav-btn">
                    <div className="nav-btn-icon">

                    </div>
                    <div className="nav-btn-text">
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }
}
