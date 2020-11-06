import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import NavbarDash from "./NavbarDash";
import axios from 'axios';
import config from '../config/settings'
import { Row, Col } from 'react-foundation';



export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      phoneNumber: '',
      password: '',
      updateDone: false,
    }
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentWillMount() {
    var agentID = localStorage.getItem("agentID");
    var organisationID = localStorage.getItem("organisationID")
    console.log("agentID  " + agentID)
    let data = {
      agentID: agentID,
      organisationID: organisationID
    };
      axios({
        method: 'get',
        url: 'http://' + config.hostname + ':' + config.backendPort + '/getProfile',
        params: data,
      })
        .then((response) => {
          if (response.status === 200) {
            let agentDetails = response.data.agent;
            console.log("agentDetails")
            console.log(agentDetails)
              this.setState({
                password: agentDetails.password,
                phoneNumber: agentDetails.phoneNumber
              });

          } else {
            console.log("unable to get agent details")
          }
        }).catch(function (err) {
          console.log(err)
        });
  
   
  }

  updateProfile = async (event) => {
    
  }
  render() {
      
    return (
      <div>
        <Sidebar />
        <NavbarDash />
        <p>{this.state}</p>
       
          
      </div>
    )
  }
}