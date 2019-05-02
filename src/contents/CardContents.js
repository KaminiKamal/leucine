import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import InputBox from '../contents/InputBox/InputBox';
import RadioButton from '../contents/radio/radioButton';
import DivButton from '../contents/DivButton/DivButton';
import Card from '../contents/Cards/Card';
import _ from 'lodash';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

import {SHOW_RINSE_PARAMETER, HIDE_RINSE_PARAMETER, SHOW_SWAB_PARAMETER, HIDE_SWAB_PARAMETER} from '../constants/config'
export default class CardContents extends Component {
    constructor(props){
        super(props);
        this.state = {
            target_residue_type_list: [],
            lod: "",
            loq: "",
            lntc: "",
            swabDisplay: false,
            rinseDisplay: false,
            divText: `Configure swab sampling parameter`,
            rinseText: `Configure rinse sampling parameter`,
            swabDetails: null,
            rinseDetails: null,
            addClassForSwab: null,
            addClassForRinse: null
        }
    }

    hideCards = (cardType) => {
        switch(cardType){
            case HIDE_SWAB_PARAMETER:
                this.setState({swabDetails: null, divText: `Configure swab sampling parameter`, addClassForSwab: null, swabDisplay: false})
                return;
            
            case HIDE_RINSE_PARAMETER:
                this.setState({rinseDetails: null, rinseText: `Configure rinse sampling parameter`, addClassForRinse: null, rinseDisplay: false})
                return;
        }
    }

    displayCards = (e) => {
       
        switch(e){
            case SHOW_SWAB_PARAMETER:
                if(!this.state.swabDisplay){
                    this.setState({divText: `Remove swab sampling parameters`, addClassForSwab: `nav-btn-container-rem`, swabDisplay: true}, () => {
                        let nodeElement = (<div>
                            <Card 
                                callback={this.callback.bind(this)} 
                                bioburdenComponents={this.props.bioburdenComponents}
                                isRequired={["SOLVENT_NAME", "SOLVENT_QUANTITY"]}
                            />
                        </div>);
                        this.mountElements({swabDetails: nodeElement});
                    })
                }
                else{
                    this.hideCards(HIDE_SWAB_PARAMETER);
                }
                
                return;

            case SHOW_RINSE_PARAMETER:
                if(!this.state.rinseDisplay){
                    this.setState({rinseText: `Remove rinse sampling parameters`, addClassForRinse: `nav-btn-container-rem`, rinseDisplay: true}, () => {
                        let nodeElement = (<div>
                            <Card 
                                callback={this.callback.bind(this)} 
                                
                            />
                        </div>);
                        this.mountElements({rinseDetails: nodeElement});
                    })
                }
                else{
                    this.hideCards(HIDE_RINSE_PARAMETER);
                }
                
                return;
        }
    }

    callback(data){
        this.props.setLQD_LODValues(data);
    }

    mountElements(cardDetails){
        this.setState(cardDetails);
    }

    getRadioButtonResponse(lntc){
        switch(lntc){
            case "Yes": 
                this.setState({lntc: true});
                this.props.setLQD_LODValues({lntc: true})
                return;

            case "No":
                this.setState({lntc: false});
                this.props.setLQD_LODValues({lntc: false})
                return;
        }
    }
    callAlert = (msg) => {
        Alert.error(msg, {
            position: 'top-right',
            timeout: 2000
        });
    }

    render() {
        return (
            <div className="card-contents">
                <Alert stack={{limit: 3}} timeout={2000} onClose={this.handleOnClose}/>
                <div className="card-content-items">
                {
                    (this.props && this.props.fieldSet)
                    ?
                    _.map(this.props.fieldSet, (element, index) => {
                        if(element==="LOD"){
                                return(
                                    <div className="display-box" key={`LOD`+index}>
                                        <InputBox 
                                            label={"LOD (in ppm)"}
                                            isRequired={true}
                                            type={"text"}
                                            ref={"lod"}
                                            addInputStyle={`input-box-half`}
                                            addClass={`input-box-container-half`}
                                            updateValue={(e) =>{
                                                if(Number(ReactDOM.findDOMNode(this.refs.lod.refs.input).value)<0){
                                                   this.callAlert(`Please enter a positive number`);
                                                   return;
                                                }
                                                this.setState({
                                                    lod: ReactDOM.findDOMNode(this.refs.lod.refs.input).value
                                                },() => {
                                                    this.props.setLQD_LODValues({lod: this.state.lod});
                                                })
                                            }}
                                        />
                                    </div>
                                )
                        }
                        if(element==="LOQ"){
                            return(
                                <div className="display-box"  key={`LOD`+index}>
                                    <InputBox 
                                        label={"LOQ (in ppm)"}
                                        isRequired={true}
                                        type={"text"}
                                        ref={"loq"}
                                        addInputStyle={`input-box-half`}
                                        addClass={`input-box-container-half`}
                                        updateValue={(e) =>{
                                            if(Number(ReactDOM.findDOMNode(this.refs.loq.refs.input).value)<0){
                                                this.callAlert(`Please enter a positive number`);
                                                return;
                                            }
                                            this.setState({
                                                loq: ReactDOM.findDOMNode(this.refs.loq.refs.input).value
                                            },() => {
                                                this.props.setLQD_LODValues({loq: this.state.loq});
                                            })
                                        }}
                                    />
                                </div>
                            )
                        }
                        
                    })
                    :
                    null
                }
                </div>

                <label>{(this.props && this.props.bioburdenComponents) ? `Define TNTC and TFTC Limits` : null}</label>
                {
                    (this.props && this.props.bioburdenComponents
                        ?
                        <div className="card-content-items">
                            {
                                _.map([0,1], (el, i) => (
                                    <RadioButton 
                                        key={i+"leucine"}
                                        label={(i==0 ? "Yes" : "No")}
                                        isRequired={false}
                                        type={"radio"}
                                        ref={(i==0) ? "lntc_y" : "lntc_n"}
                                        name={"lntc"}
                                        addInputStyle={`input-box-half`}
                                        addClass={`input-box-container-half`}
                                        updateValue={this.getRadioButtonResponse.bind(this)}
                                    />
                                ))
                            }
                        </div>
                        :
                        null
                    )
                }
                

                {
                    (this.state.lntc)
                        ?
                    <div className="card-content-items">
                        <div className="display-box">
                            <InputBox 
                                label={"LNTC (in CFU)"}
                                isRequired={true}
                                type={"text"}
                                ref={"lntc"}
                                addInputStyle={`input-box-half`}
                                addClass={`input-box-container-half`}
                                updateValue={(e) =>{
                                    this.setState({
                                        lod: ReactDOM.findDOMNode(this.refs.lntc.refs.input).value
                                    },() => {
                                        this.props.setLQD_LODValues({lntc: this.state.lod});
                                    })
                                }}
                            />
                        </div>
                        <div className="display-box">
                            <InputBox 
                                label={"LFTC (in CFU)"}
                                isRequired={true}
                                type={"text"}
                                ref={"lftc"}
                                addInputStyle={`input-box-half`}
                                addClass={`input-box-container-half`}
                                updateValue={(e) =>{
                                    this.setState({
                                        lod: ReactDOM.findDOMNode(this.refs.lftc.refs.input).value
                                    },() => {
                                        this.props.setLQD_LODValues({lftc: this.state.lftc});
                                    })
                                }}
                            />
                        </div>
                    </div>
                        :
                    null
                }
                
                <div className="card-content-items">
                    <DivButton 
                        ref={"swab_sampling"}
                        text={this.state.divText}
                        addClass={this.state.addClassForSwab}
                        updateValue={(e) =>{
                                this.displayCards(SHOW_SWAB_PARAMETER);
                            }
                        }
                    />
                </div>
                
                    {(this.state.swabDetails)
                        ?
                    <div className="card-content-displayDetails">
                        {this.state.swabDetails}
                    </div>
                        :
                        null
                    }
                
                <div className="card-content-items">
                    <DivButton 
                        ref={"rinse_sampling"}//nav-btn-container-rem
                        addClass={this.state.addClassForRinse}
                        text={this.state.rinseText}
                        updateValue={(e) =>{
                                this.displayCards(SHOW_RINSE_PARAMETER);
                            }
                        }
                    />
                </div>
                
                {(this.state.rinseDetails)
                        ?
                    <div className="card-content-displayDetails">
                        {this.state.rinseDetails}
                    </div>
                        :
                        null
                    }
            </div>
        )
    }
}