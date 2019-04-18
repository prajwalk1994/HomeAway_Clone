import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import './OwnerLogin.css';
//Redux
import { connect } from 'react-redux';
import { authenticateOwner } from '../../actions/authenticateUserActions';

class OwnerLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            authFlag : false
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    submitLogin =async (e) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        axios.defaults.withCredentials = true;
        await this.props.authenticateOwner(data);
        if (this.props.ownerDetails.token) {
            this.props.history.push('/');
        }
        // else{
        //     alert("Please enter correct username and password");
        // }
    }

    render(){
        let redirectVar = null;
        if(cookie.load('ownerCookie')){
            redirectVar = <Redirect to= "/ownerDashboard"/>
        }
        return(
            <div class="owner-login">
            <Navbar/>
                {redirectVar}
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 image-column">
                        <img src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png" alt="owner-png"></img>  
                    </div>
                    <div class="col-lg-6">
                        <div class="login-form owner-login">
                            <div class="border-login">
                                <div class="panel">
                                    <h2 class="title-text">Owner Login</h2>
                                    <p>Please enter your Email and password</p>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="text" class="form-control" id="inputEmail" name="email" placeholder="Email ID" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" class="form-control" id="inputPassword" name="password" placeholder="Password" required/>
                                </div>
                                <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>
                                <hr/>
                                <h6 class="signup-text"> Want to list your property?<Link to='/ownerSignup'>Sign Up</Link> </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">

                    Use of this Web site constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy.
                    
                    ©2018 HomeAway. All rights reserved.
                </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = ({ ownerDetails }) => ({
    ownerDetails,
});

export default connect(mapStateToProps, { authenticateOwner })(OwnerLogin);
