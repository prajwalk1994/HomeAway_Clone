import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './Navbar.css';
//Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutTraveller, logoutOwner} from '../../actions/authenticateUserActions';

//create the NavBar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        alert("You have logged out");
        this.props.logoutTraveller();
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(this.props.travellerDetails.email != ""){
            console.log("Able to read cookie");
            navLogin = (
              <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                {this.props.travellerDetails.email}
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="/travellerDashboard">Dashboard</a>
                <a class="dropdown-item" href="/updateProfile">Profile</a>
                <a class="dropdown-item" href="/" onClick = {this.handleLogout}>Logout</a>
              </div>
            </li>
            );
        }else{
            //Else display login button
            navLogin = (
              <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                Login
              </a>
              <div class="dropdown-menu">
                <li class="dropdown-item"><Link to="/travellerLogin">Traveller Login</Link></li>
                <li class = "dropdown-item"><Link to="/ownerLogin">Owner Login</Link></li>
              </div>
              </li>
            )
        }
        let redirectVar = null;
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-light navbar-expand-sm">
                    <a class="navbar-brand" href="/"><img src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"/></a>
                    <ul class="nav navbar-nav ml-auto">
                        <li class="nav-item"><Link class="nav-link" to="/travellerDashboard">Trip boards</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/ownerDashboard">Owner Dashboard</Link></li>
                        {navLogin}
                        <li class="nav-item"><Link class="nav-link" to="/">Help</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/listProperty">List Your Own Property</Link></li>
                    </ul>
            </nav>
        </div>
        )
    }
}

const mapStateToProps = ({travellerDetails, ownerDetails}) => ({
    travellerDetails,
    ownerDetails,
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logoutTraveller,
        logoutOwner,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);
