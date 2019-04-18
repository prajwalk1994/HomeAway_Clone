import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Homepage.css';
//Redux
import {setSearchQuery} from '../../actions/PropertyActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutTraveller, logoutOwner} from '../../actions/authenticateUserActions';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      location: '',
      startDate: '',
      endDate: '',
      numberOfGuests: '',
    })
  }

  locationChangleHandler = (e) => {
    this.setState({
      location: e.target.value
    })
  }

  startDateChangeHandler = (e) => {
    this.setState({
      startDate: e.target.value
    })
  }

  endDateChangehandler = (e) => {
    this.setState({
      endDate: e.target.value
    })
  }

  guestsChangeHandler = (e) => {
    this.setState({
      numberOfGuests : e.target.value,
    })
  }

  submitSearchDetails = () => {
    const searchData = {
      location: this.state.location,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      numberOfGuests : this.state.numberOfGuests,
    }
    this.props.setSearchQuery(searchData);
    this.props.history.push("/searchResults");
  }

  handleLogout = () =>{
    alert("You have been logged out");
    this.props.logoutTraveller();
  }

  render() {
    let navLogin = null;
    if (this.props.travellerDetails.email) {
      navLogin = (
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
            {this.props.travellerDetails.email}
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/travellerDashboard">Dashboard</a>
            <a class="dropdown-item" href="/updateProfile">Profile</a>
            <a class="dropdown-item" href="/" onClick={this.handleLogout}>Logout</a>
          </div>
        </li>
      );
    } else {
      //Else display login button
      navLogin = (
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
            Login
              </a>
          <div class="dropdown-menu">
            <li class="dropdown-item"><Link to="/travellerLogin">Traveller Login</Link></li>
            <li class="dropdown-item"><Link to="/ownerLogin">Owner Login</Link></li>
          </div>
        </li>
      )
    }
    let redirectVar = null;
    return (
      <div class="main-homepage">
        {redirectVar}
            <nav class="navbar fixed-top navbar-expand-sm">
                  <a class="navbar-brand" href="/"><img src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"/></a>
        <ul class="nav navbar-nav ml-auto">
          <li class="nav-item"><Link class="nav-link" to="/travellerDashboard">Trip boards</Link></li>
          <li class="nav-item"><Link class="nav-link" to="/ownerDashboard">Owner Dashboard</Link></li>
          {navLogin}
          <li class="nav-item"><Link class="nav-link" to="/">Help</Link></li>
          <li class="nav-item"><Link class="nav-link" to="/listProperty">List Your Own Property</Link></li>
        </ul>
        </nav>
        <div class="jumbotron jumbotron-fluid main-jumbotron">
          <div class="container">
            <h2 class="jumbotron-heading">Book beach houses, cabins<br />condos and more, worldwide</h2>
            <form class="form-inline my-form">
              <div class='form-group row'>
                <div class='col'>
                  <label for="location">City</label>
                  <input type='text' id='location' name='location' class='form-control' placeholder='Location' onChange={this.locationChangleHandler} required />
                </div>
                <div class='col'>
                  <label for='startDate'>Start Date</label>
                  <input type='date' class="form-control" name='startDate' onChange={this.startDateChangeHandler} />
                </div>
                <div class='col'>
                  <label for='endDate'>End Date</label>
                  <input type='date' class="form-control" name='endDate' onChange={this.endDateChangehandler} />
                </div>
                <div class='col'>
                  <label for='numberOfGuests'>Guests</label>
                  <input type='text' class="form-control" name='numberOfGuests' onChange={this.guestsChangeHandler} placeholder="Number of Guests"/>
                </div>
                <div class='col'>
                  <button class="btn btn-primary" type='submit' onClick={this.submitSearchDetails} class='btn btn-primary'> Search </button>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-md-4">
                <h5 class="sub-heading">Your whole vacation starts here</h5><h6 class="sub-heading">Choose a rental from the worlds best selection</h6>
              </div>
              <div class="col-md-4">
                <h5 class="sub-heading">Book and stay with confidence</h5><h6 class="sub-heading">Secure payments, peace of mind</h6>
              </div>
              <div class="col-md-4">
                <h5 class="sub-heading">Your vacation your way</h5><h6 class="sub-heading">More space, More privacy, no compromises</h6>
              </div>
            </div>
          </div>
          {/* <h3>Find spaces that fit your style</h3>
          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <div class="card-img-top" src="https://odis.homeaway.com/odis/destination/47a2821d-b39f-4e92-b17d-b3dbfb79510f.hw6.jpg">
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({searchDetails, travellerDetails, ownwerDetails}) => ({
  searchDetails,
  travellerDetails,
  ownwerDetails,
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setSearchQuery,
    logoutOwner,
    logoutTraveller,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
