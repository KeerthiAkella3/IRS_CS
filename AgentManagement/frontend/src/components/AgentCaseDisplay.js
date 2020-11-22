import React, { Component,useState } from "react";
import axios from "axios";
import {
    Button,
    Row,
    Col,
    Container,
    Tabs,
    Tab,
    Nav
  } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import '../css/agent.css';
import AgentCaseHistory from './AgentCaseHistory';
import Messages from './Messages';
import {} from "./utils.js";
import swal from 'sweetalert'
import {getEmailId} from './utils';

const config = require("../config/settings.js");

class AgentCaseDisplay extends Component{
    constructor(props){
        super(props);
       
        this.state={
            caseDetails: props.caseDetails,
            history:"",
            caseId:"",
            isLoaded: false,
            status: '',
        }
    }
  
    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});
    componentDidMount(){
        this.getHistory(this.props.caseDetails)
     
    }
    componentDidUpdate(prevProps){
      if(prevProps.caseId != this.props.caseId){
        this.setState({
          caseDetails: this.props.caseDetails,
          caseId: this.props.caseId,
          isLoaded: false
        })
        this.getHistory(this.props.caseDetails)
      }
    }

    handleChange = (e) => {
      let status = e.target.value;

      this.setState({
        status: status
      });
    }
    getHistory = async (caseDetails)=>{
      if(caseDetails && caseDetails.CaseID && caseDetails.UserID){
        await axios(config.rooturl + "/history/" + caseDetails.UserID +"/"+caseDetails.CaseID  , {
            method: "get",
            config: { headers: { "Content-Type": "application/json" } }
          })
            .then((res) => {
              this.setState({ history: res.data, isLoaded:true });
              console.log("history: ", this.state.history);
            })
            .catch((error) => console.log(error.response.data));
      }
    }

    render(){
       let {caseDetails, isLoaded} = this.state;
       const closeBtn = (
        <button className="close" onClick={() => this.props.showModal()}>
          &times;
         </button>
      );
      if(caseDetails && isLoaded){
        return (
            
              <Modal  
              isOpen={this.props.modal}
              toggle={() => this.props.showModal()}
              className="modal-xl"
              scrollable>
                <ModalHeader
                      size="lg"
                      toggle={() => this.props.showModal()}
                      close={closeBtn}
                    >
                    <div className="flex">
                    <span>Case ID: {caseDetails.CaseID}</span>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col><b>Description:</b></Col>
                        </Row>
                        <Row>
                            <Col>{caseDetails.Information}</Col>
                        </Row>
                        <br></br>
                        <br></br>
                        <Row>
                            <Col><b>Status:</b></Col>
                            <Col><b>Category:</b></Col> 
                        </Row>
                        <Row>
                            <Col>
                              <select id="Status" value={caseDetails.Status} onChange={this.handleChange}>
                                <option value="Assigned">Assigned</option>
                                <option value="InProgress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                              </select>
                            </Col>
                            <Col>{caseDetails.Category}</Col>
                        </Row>
                    </Container>

                    <br></br>
                    <br></br>

                    <Tabs defaultActiveKey="messages" id="casetab">
                        <Tab eventKey="messages" title="Comments" tabClassName = "halfWidth">
                            <Messages messages={caseDetails.Messages} caseId={caseDetails.CaseID}/>
                        </Tab>
                        <Tab eventKey="history" title="Case History" tabClassName = "halfWidth">
                            {/*<CaseHistory caseId={caseDetails.CaseID} userId={caseDetails.UserID}/>*/}
                            <AgentCaseHistory caseId = {this.state.caseId} history={this.state.history}/>
                        </Tab>
                    </Tabs>
                  
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </Modal>
          )
        } else {
          return <div></div>
        }
    }
    
  }
  
export default AgentCaseDisplay;