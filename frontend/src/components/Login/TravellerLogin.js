import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import './TravellerLogin.css';
//Redux
import {connect} from 'react-redux';
import {authenticateTraveller} from '../../actions/authenticateUserActions';


class TravellerLogin extends Component{
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


    submitLogin = async (e) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
      axios.defaults.withCredentials = true;
        await this.props.authenticateTraveller(data);
        if(this.props.travellerDetails.token){
            this.props.history.push('/');
        }
        // else{
        //     alert("Please enter correct username and password");
        // }
    }

    render(){
        let redirectVar = null;
        if(cookie.load('travellerCookie')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div class="traveller-login">
                <Navbar/>
                    {redirectVar}
                <h1 class="title-text">Log in to HomeAway</h1>
                <h3 class="title-text">Need an account? <Link to='/travellerSignup'>Sign Up</Link></h3>
                <div class="container my-form">
                    <div class="login-form">
                        <h4 class="form-title">Account Login</h4>
                        <hr/>
                        <div class="form">
                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="text" class="form-control" id="inputEmail" name="email" placeholder="Email ID" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" id="inputPassword" name="password" placeholder="Password" required/>
                            </div>
                            <div class="form-group">
                                <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-facebook">Login with Facebook</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">

                    Use of this Web site constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy.
                    
                    ©2018 HomeAway. All rights reserved.
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ travellerDetails }) => ({
    travellerDetails,
});

export default connect(mapStateToProps, {authenticateTraveller})(TravellerLogin);
