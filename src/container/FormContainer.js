import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../contents/Button/Button';
import InputBox from '../contents/InputBox/InputBox';
import SelectBox from '../contents/selectBox/SelectBox';
import fetchData from '../modules/NetworkAdapter';
import {FETCH_TARGET_RESIDUE_TYPE} from '../constants/config';
import CardContents from '../contents/CardContents';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as aioActions from '../actions/index';
import  _ from 'lodash';
let _this;
class FormContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            target_residue_type_list: [],
            contents: null,
            bioburdenComponents: null,
            dataList: {}
        }
        this.dataList = {};
        _this = this;
    }
    componentDidMount(){
        fetchData.getJson(FETCH_TARGET_RESIDUE_TYPE)
        .then(res => {
            this.setState({target_residue_type_list: res})
        })
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.messageToSubmit){
            let data = {
                updateDataList: _this.dataList
            }
            nextProps.updateData(data)
            //redux call;
        }
        return prevState;
    }
    valueSetterFunction(data){
        Object.assign(this.dataList, data);
    }
    targetResidueType(e){
        this.setState({contents: null, bioburdenComponents: null});
        let target_residue_type = ReactDOM.findDOMNode(this.refs.target_residue_type.refs.input).value;
        this.valueSetterFunction({target_residue_type: target_residue_type});

        this.setState({target_residue_type: ReactDOM.findDOMNode(this.refs.target_residue_type.refs.input).value}, () =>{
            switch(target_residue_type){
                case "API":
                    this.setState({contents: <CardContents fieldSet={["LOD","LOQ"]} setLQD_LODValues={this.valueSetterFunction.bind(this)} />})
                    return this;
                case "CLEANING_AGENT":
                    this.setState({contents: <CardContents fieldSet={["LOD","LOQ"]} setLQD_LODValues={this.valueSetterFunction.bind(this)} />})
                    return this;
                case "BIOBURDER":
                    this.setState({
                        bioburdenComponents: true,
                        contents: <CardContents fieldSet={["LNTC/TFTC"]} bioburdenComponents={true} setLQD_LODValues={this.valueSetterFunction.bind(this)} />
                    })
                    return this;
                case "ENDOTOXIN":
                    this.setState({contents: <CardContents fieldSet={["LNTC/TFTC"]} bioburdenComponents={true} setLQD_LODValues={this.valueSetterFunction.bind(this)} />})
                    return this;
            }
        });
        
    }
    render(){
        return(
            <div className="form-container">
                <div className="box-container">
                    <InputBox 
                        label={"Analytical Method ID"}
                        isRequired={true}
                        addInputStyle={'custom-box-style'}
                        type={"text"}
                        ref={"analytical_method_ID"}
                        updateValue={(e) => {this.setState({analytical_method_ID: ReactDOM.findDOMNode(this.refs.analytical_method_ID.refs.input).value}
                        ,() => {
                            this.valueSetterFunction({analytical_method_ID: this.state.analytical_method_ID})
                            })
                            }
                        }
                    />
                    <SelectBox 
                        label={"Target Residue Type"}
                        isRequired={true}
                        type={"select"}
                        ref={"target_residue_type"}
                        options={this.state.target_residue_type_list}
                        updateValue={this.targetResidueType.bind(this)}
                    />
                    {(this.state.bioburdenComponents) 
                            ?
                        <InputBox 
                            label={"Method Used"}
                            isRequired={true}
                            type={"text"}
                            ref={"method_used"}
                            updateValue={(e) => {this.setState({method_used: ReactDOM.findDOMNode(this.refs.method_used.refs.input).value}, () => 
                                this.valueSetterFunction.bind({method_used: this.state.method_used})
                            )}}
                        />  
                            : 
                        null
                    }
                    <div className="selected-content-area">
                        {this.state.contents}
                    </div>
                    <InputBox 
                        label={"reason"}
                        isRequired={true}
                        type={"text"}
                        addInputStyle={'custom-box-style'}
                        ref={"reason"}
                        updateValue={(e) => {this.setState({reason: ReactDOM.findDOMNode(this.refs.reason.refs.input).value}, () => {
                            this.valueSetterFunction({reason: this.state.reason});
                        })}}
                    />
                </div>
                
            </div>
        )
    }
}
const  mapStateToProps = (state, ownProps) => {
    
        return {
            updatedDataList: state.updateDataList
        };
    }
    
const mapDispatchToProps = dispatch => ({
    updateData: (dataList) => dispatch(aioActions.updateData(dataList))
});
export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);