import React,{Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Navbar from '../Navbar/Navbar';
import {Redirect} from 'react-router';
import './PropertyResults.css';
import {BASE_URL} from '../../BaseUrl';
//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPropertyDetails } from '../../actions/PropertyActions';
import {bindActionCreators} from 'redux';

class PropertyResults extends Component{

  constructor(props){
    super(props);
    this.state = {
      startDate : "",
      endDate : "",
      numberOfGuests : "",
      message : "",
    }
  }

  componentDidMount() {
    const data = {
      propertyID : this.props.propertyDetails.currentPropertyID,
    }
    console.log(data);
    this.props.setPropertyDetails(data);

    //console.log(data);
    // axios.post('http://localhost:3001/getPropertyResult',data)
    //       .then((response) => {
    //       this.setState({
    //           properties : this.state.properties.concat(response.data)
    //       });
          //console.log(response.data);
      // });
  }

  startDateChangeHandler = (e) => {
    this.setState({
      startDate : e.target.value,
    })
  }

  endDateChangehandler = (e) => {
    this.setState({
      endDate : e.target.value,
    })
  }

  numberOfGuestsHandler = (e) => {
    this.setState({
      numberOfGuests : e.target.value,
    })
  }

  messageChangeHandler = (e) => {
    this.setState({
      message : e.target.value,
    })
  }

  bookProperty(e,property,startDate,endDate, numberOfGuests){
    console.log("Book property method");
    const data = {
      property : property,
      traveller : this.props.travellerDetails.email,
      startDate : startDate,
      endDate : endDate,
      numberOfGuests : numberOfGuests,
    }
    axios.post(BASE_URL+'/bookProperty',data)
      .then((response) => {
        if(response.status == 200){
          console.log("property booked successfully");
          alert("Property booked succesfully");
          this.props.history.push("/");
        }
        else{
          console.log("Error booking property");
        }
      })
  }

  sendMessage = (e,Owner) => {
    e.preventDefault();
    console.log("Sending message to Owner");
    const data = {
      Type : "Owner",
      Traveller : this.props.travellerDetails.email,
      Owner : Owner,
      Text : this.state.message,
    }
    axios.post(BASE_URL+"/setMessage", data)
      .then((response) => {
        if(response.status == 200){
          alert("Message sent to the Owner");
        } else {
          alert("Error sending message. Please try again");
        }
      })
  }

  render(){
    if (!this.props.propertyDetails.property){
      return(<div>Loading</div>);
    }
    let property = this.props.propertyDetails.property;
    console.log(property);
    let redirectVar = null;
    if(!this.props.travellerDetails.email){
        redirectVar = <Redirect to= "/travellerLogin"/>
      }
    let imgCarousel = [];
      for(let i=2; i<=property.Images; i++){ 
      imgCarousel.push(
        <div class="carousel-item" >
          <img class="d-block w-100 property-img" src={`${BASE_URL}/uploads/p${property._id}/${i}.jpg`} alt={`${i}.jpg`} width="1100" height="500"/>
        </div>
      )
    }
    return(
      <div>
        {redirectVar}
        <Navbar/>
        <div class='container'>
          <div class="container">
            <div class="row">
              <div class="col-md-8 left-container">
                {/* <img class="d-block w-100 property-img" src={`http://localhost:3001/uploads/${property.Owner}/${property.Title}/1.jpg`} alt="Property image" /> */}
                <div id="img-carousel" class="carousel slide" data-ride="carousel">
                  <div class="carousel inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100 property-img" src={`${BASE_URL}/uploads/p${property._id}/1.jpg`} alt="1.jpg" />
                    </div>
                    {imgCarousel}
                    </div>
                    <a class="carousel-control-prev" href="#img-carousel" data-slide="prev">
                      <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#img-carousel" data-slide="next">
                      <span class="carousel-control-next-icon"></span>
                    </a>
                  </div>
                <h1 class="property-title">{property.Title}</h1>
                <h4>Description</h4>
                <hr />
                {property.Description}
                <h4>Address</h4>
                <hr />
                {property.Street} <br />
                {property.City}<br />
                {property.State + " " + property.Zip}<br />
                <h4>Bedrooms</h4>
                <hr />
                {property.Bedrooms + " Beds"}<br />
                {"Sleeps " + property.Bedrooms * 2}
                <h4>Bathrooms</h4>
                <hr />
                {property.Bathrooms + " Baths"}<br />
                <h4>Owner</h4>
                <hr />
                {property.Owner}<br />
              </div>
              <div class="col-md-4 right-container">
                <div class="form-group">
                  <h1 class="property-rate">${property.Rate}</h1> per night <br></br>
                  <div class="form-inline booking-form">
                    <div class="col-md-6">
                      <label for='StartDate'>Start Date</label>
                      <input class="form-control" type="date" onChange={this.startDateChangeHandler} name="StartDate" />
                    </div>
                    <div class="col-md-6">
                      <label for='EndDate'>End Date</label>
                      <input class="form-control" type="date" onChange={this.endDateChangehandler} name="EndDate" />
                    </div>
                  </div>
                  <input class="col-md-11 guests-form form-control" type="text" onChange={this.numberOfGuestsHandler} name="numberOfGuests" placeholder="Number of Guests" />
                  <button class="book-btn btn btn-primary" onClick={(e) => this.bookProperty(e, property, this.state.startDate, this.state.endDate, this.state.numberOfGuests)}>Book</button><br/>
                  <label for="message">Send message to Owner</label>
                  <textarea class="form-control" name="message" id="message" rows="4" onChange={this.messageChangeHandler}></textarea>
                  <button class="btn btn-primary" onClick={(e) => this.sendMessage(e,property.Owner)}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ propertyDetails, travellerDetails }) => ({
  propertyDetails,
  travellerDetails,
});

const mapDispatchToProps = (dispatch) => { 
  return bindActionCreators({  
    setPropertyDetails,
   }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(PropertyResults);