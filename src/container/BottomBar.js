import React, { Component } from 'react'
import Button from '../contents/Button/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as aioActions from '../actions/index';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

class BottomBar extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    updateFinalValue(){
        this.props.signalToUpdate();
    }
    cancelFinalValue(){
        Alert.error('Failed to submit!', {
            position: 'top-right',
            timeout: 2000
        });
    }

    static getDerivedStateFromProps(nextProps, prevState){
        //console.log("getDerivedStateFromProps", nextProps, prevState);
        if(nextProps.updatedDataList){
            //code to call API to submit data
            //alert('Data Submitted')
            if(!nextProps.updatedDataList.analytical_method_ID){
                Alert.error('Failed to submit! Must provide an Analytical Method ID', {
                    position: 'top-right',
                    timeout: 'none'
                });
            }
            else{
                Alert.success('Data Submitted Successfully!', {
                position: 'top-right',
                timeout: 'none'
            });
        }
        }
        return prevState;
    }
    

    render() {
        //console.log("ppppppppp", this.props)
        return (
            <div className="bottom-bar">
                <Alert stack={{limit: 3}} timeout={2000} onClose={this.handleOnClose}/>
                <div className="button-container">
                    <div className="btn-float-left">
                        <Button 
                            label={"Cancel"}
                            isRequired={true}
                            type={"button"}
                            addInputStyle={`button-box-left`}
                            updateFinalValue={this.cancelFinalValue.bind(this)}
                        />
                    </div>
                    
                    <div className="btn-float-right">
                        <Button 
                            label={"Update"}
                            isRequired={true}
                            type={"button"}
                            addInputStyle={`button-box-right`}
                            updateFinalValue={this.updateFinalValue.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
  }
}
const  mapStateToProps = (state, ownProps) => {
    //console.log("mapStateToProps", state)
        return {
            updatedDataList: state.updateDataList
        };
    }
    

export default connect(mapStateToProps, null)(BottomBar);