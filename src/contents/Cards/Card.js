import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './Card.scss';
import InputBox from '../InputBox/InputBox';
import SelectBox from '../selectBox/SelectBox';
import RadioButton from '../radio/radioButton'; 
import MiniRadioButton from '../radio/miniRadioButton';
import DivButton from '../DivButton/DivButton';
import MiniCards from './MiniCards';
import {default as UUID} from "node-uuid";

export default class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            swapSampling_API: {
                method_used: "",
                solvent_quantity: "",
                solvent_name: "",
                default_recovery: "",
                MOC: []
            },
            deletedIds: [],
            recovery: null,
            moc_display: false,
            divText: `Add MOC`,
            miniCard: [],
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
    // callback(){

    // }

    targetResidueType(){

    }
    deleteMiniCards(e){
        let prevList = this.state.miniCard;
        let deletedIds = this.state.deletedIds;
       // console.log("_id", e);
        
        _.forEach(prevList, (_element, _index) => {
            if(_element && _element.key===e){
                prevList.splice(_index, 1)
                deletedIds.push(e);
            }
        });
        this.setState({miniCard: prevList});
        this.props.callback({deleteMincardIds: deletedIds})
    }
    
    populateMiniCards(){
        let prevList = this.state.miniCard;
        this.id = UUID.v4();
        let nodeElement = {
            key: this.id,
            value: (<MiniCards key={this.state.miniCard.length} _id={this.id} deleteMiniCards={this.deleteMiniCards.bind(this)} callback={this.props.callback.bind(this)} />)
        };
        prevList.push(nodeElement);
        this.setState({miniCard: prevList})
    }
    removeMiniCards(){

    }
    displayMiniCards(){
        let statement = (this.state.miniCard.length>0 ? `Create a new MOC` : `Add MOC`)
        this.setState({ divText:  `Add MOC`}, () => {
            this.populateMiniCards();
        });
    }
    getRadioButtonResponse(data){
        this.setState({recovery: (data==="Yes" ? false : true)}, () => {this.props.callback({recovery: this.state.recovery})});
        
    }
    render() {
        
        return (
            <div className="card-container">
                <div className="card-content">
                    {
                        (!this.props.bioburdenComponents
                            ?
                        <InputBox 
                            label={"Method Used"}
                            isRequired={true}
                            type={"text"}
                            ref={"method_used"}
                            updateValue={(e) =>{
                                this.setState({
                                    swapSampling_API: {
                                        method_used: ReactDOM.findDOMNode(this.refs.method_used.refs.input).value
                                    }
                                },() => {
                                    this.props.callback({
                                        swapSampling_API: {
                                        method_used: this.state.swapSampling_API.method_used
                                    }});
                                })
                            }}
                        />  
                        :
                        null  
                        )
                    }
                    
                    {
                        (this.props && this.props.isRequired && !this.props.bioburdenComponents
                            ?
                            <div style={{display: "flex"}}>
                               
                                {
                                    _.map(this.props.isRequired, (el,i) => {
                                        if(el==="SOLVENT_NAME"){
                                            return (
                                            <div key={`solvent`+i}>
                                                <InputBox 
                                                    label={"Solvent name"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    ref={"solvent_name"}
                                                    addInputStyle={`input-box-half`}
                                                    addClass={`input-box-container-half`}
                                                    updateValue={(e) =>{
                                                        this.setState({
                                                            swapSampling_API:{
                                                                solvent_name: ReactDOM.findDOMNode(this.refs.solvent_name.refs.input).value
                                                            } 
                                                        },() => {
                                                            this.props.callback({swapSampling_API:{
                                                                solvent_name: this.state.swapSampling_API.solvent_name
                                                            }} );
                                                        })
                                                    }}
                                                />
                                            </div>
                                        
                                            )
                                        }
                                        if(el==="SOLVENT_QUANTITY"){
                                            return (
                                                <div key={`solvent_qua`+i}>
                                                    <InputBox 
                                                        label={"Solvent Quantity"}
                                                        isRequired={true}
                                                        type={"text"}
                                                        ref={"solvent_quantity"}
                                                        addInputStyle={`input-box-half`}
                                                        addClass={`input-box-container-half`}
                                                        updateValue={(e) =>{
                                                            this.setState({
                                                                swapSampling_API:{
                                                                    solvent_quantity: ReactDOM.findDOMNode(this.refs.solvent_quantity.refs.input).value
                                                                }
                                                            },() => {
                                                                this.props.callback({swapSampling_API:{solvent_quantity : this.state.swapSampling_API.solvent_quantity}});
                                                            })
                                                        }}
                                                    />
                                                </div>
                                        
                                            )
                                        }
                                    })
                                }
                            </div>
                            :
                            null
                        )
                    }
                    
                    {
                        (this.props.bioburdenComponents
                            ?
                            <div style={{textAlign: "center"}}>
                                <label><span className="mandatory-label">*</span>Use Recovery for swab?</label>
                                <div style={{display: 'flex'}}>
                                    {_.map([0,1], (el, i) => (
                                        <MiniRadioButton 
                                            key={i+"leuc"}
                                            label={(i==0 ? "Yes" : "No")}
                                            isRequired={false}
                                            type={"radio"}
                                            ref={(i==0) ? "recv_y" : "recv_n"}
                                            name={"mini_recovery"}
                                            addInputStyle={`input-box-half`}
                                            addClass={`input-box-container-half`}
                                            updateValue={this.getRadioButtonResponse.bind(this)}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            
                            :
                            null
                        )
                    }
                    
                    <InputBox 
                        label={"Default Recovery (%)"}
                        isRequired={true}
                        type={"text"}
                        ref={"default_recovery"}
                        updateValue={(e) =>{
                            this.setState({
                                swapSampling_API:{
                                    default_recovery: ReactDOM.findDOMNode(this.refs.default_recovery.refs.input).value
                                } 
                            },() => {
                                this.props.callback({default_recovery: this.state.recovery});
                            })
                        }}
                    />
                    <div>
                        
                        <div style={{backgroundColor: '#EFEFEF'}}>
                            {_.map(this.state.miniCard,  (_elem, _ind) => (_elem.value))}
                       
                            <DivButton 
                                ref={"add_moc"}
                                text={(this.state.miniCard.length>0) ? `Add another or Create New MOC` : `Add MOC`}
                                addClass={(this.state.miniCard.length>0) ? 'miniCardText' : `miniCardButton`}
                                updateValue={(e) =>{
                                    this.setState({
                                        moc_display: !this.state.moc_display,
                                        
                                    },() => {
                                        this.displayMiniCards();
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
