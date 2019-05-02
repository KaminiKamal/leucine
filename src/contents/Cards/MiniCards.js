import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './Card.scss';
import InputBox from '../InputBox/InputBox';
import SelectBox from '../selectBox/SelectBox';
import DivButton from '../DivButton/DivButton';

export default class MiniCards extends Component {
    constructor(props){
        super(props);
        this.state = {
            MOC: [],
            moc_display: false,
            divText: `Add MOC`,
            miniCard: null,
            miniCardsOptions: [
                {
                    name: "Stainless Steel",
                    _id: "1234567",
                    key: "STAINLESS_STEEL"
                },
                {
                    name: "Glass",
                    _id: "894RBNTNVN",
                    key: "GLASS"
                },
                {
                    name: "Teflon",
                    _id: "1234567UUUUU",
                    key: "TEFLON"
                },
                {
                    name: "Plastic",
                    _id: "874t68743y9g",
                    key: "PLASTIC"
                }
            ]
        }
    }
    targetResidueType(){

    }
    deleteMiniCards(e){
        //console.log(this.props.index)
        this.props.deleteMiniCards(this.props._id);
    }
    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <SelectBox 
                        label={`Select MOC`}
                        isRequired={true}
                        type={"select"}
                        ref={"select_moc"}
                        addInputStyle={`select-box-half`}
                        addClass={`select-box-container-half`}
                        options={this.state.miniCardsOptions}
                        updateValue={(e) => {
                            this.setState({
                                select_moc: ReactDOM.findDOMNode(this.refs.select_moc.refs.input).value
                            },() => {
                                this.props.callback({select_moc: this.state.select_moc, _id: this.props._id});
                            })
                        }}
                    />
                    <InputBox 
                        label={`Recovery (%)`}
                        isRequired={true}
                        type={"text"}
                        ref={"recovery_percent"}
                        addInputStyle={`input-box-half`}
                        addClass={`input-box-container-half`}
                        updateValue={(e) =>{
                            this.setState({
                                MOC: ReactDOM.findDOMNode(this.refs.recovery_percent.refs.input).value
                            },() => {
                                this.props.callback({MOC: this.state.MOC,  _id: this.props._id});
                            })
                        }}
                    />
                    <div className="delete-btn" onClick={this.deleteMiniCards.bind(this)}>X</div>
                </div>
            </div>
        )
    }
}
