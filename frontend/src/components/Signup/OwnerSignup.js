import React,{Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from '../Navbar/Navbar';
import {BASE_URL} from '../../BaseUrl';

class OwnerSignup extends Component{
    constructor(props){
      super(props);
      this.state = {
        email : "",
        password : "",
        fullName : ""
      }
      this.emailChangeHandler = this.emailChangeHandler.bind(this);
      this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
      this.fullNameChangeHandler = this.fullNameChangeHandler.bind(this);
    }

    emailChangeHandler = (e) =>{
      this.setState({
        email : e.target.value
      })
    }

    passwordChangeHandler = (e) =>{
      this.setState({
        password : e.target.value
      })
    }

    fullNameChangeHandler = (e) =>{
      this.setState({
        fullName : e.target.value
      })
    }

    submitNewOwner = (e) =>{
      var headers = new Headers();
      e.preventDefault();
      const data = {
        email : this.state.email,
        password : this.state.password,
        fullName : this.state.fullName
      }
      axios.defaults.withCredentials = true;
      axios.post(BASE_URL+'/ownerSignup',data)
        .then(response => {
          if(response.status == 200){
            console.log("New user added succesfully");
            this.props.history.push('/ownerLogin');
          }
          else{
            alert("Please try again");
            console.log("Error adding new User");
          }
        })
        .catch(error => {console.log("Error");})
    }

    render(){
      return(
          <div>
          <Navbar/>
          <div class="container">
            <div class="login-form">
                  <div class="main-div">
                      <div class="panel">
                          <h2>Owner Signup</h2>
                          <p>Please enter your details</p>
                      </div>

                          <div class="form-group">
                              <input onChange = {this.emailChangeHandler} type="email" class="form-control" id="inputEmail" name="email" placeholder="Email ID" required/>
                          </div>
                          <div class="form-group">
                              <input onChange = {this.passwordChangeHandler} type="password" class="form-control" id="inputPassword" name="password" placeholder="Password" required/>
                          </div>
                          <div class="form-group">
                              <input onChange = {this.fullNameChangeHandler} type="text" class="form-control" id="inputPassword" name="password" placeholder="Full Name" required/>
                          </div>
                          <button onClick = {this.submitNewOwner} class="btn btn-primary">Signup</button>
                  </div>
              </div>
          </div>
          </div>
      )
    }

}
export default OwnerSignup;
