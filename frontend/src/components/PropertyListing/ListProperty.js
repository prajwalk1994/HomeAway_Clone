import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import {Redirect} from 'react-router';
import $ from 'jquery';
import './ListProperty.css';
import {BASE_URL} from '../../BaseUrl';
//Redux
import {connect} from 'react-redux';

class ListProperty extends Component{
  constructor(props){
    super(props);
    this.state = {
      Title : "",
      Description : "",
      Bedrooms : "",
      Bathrooms : "",
      numberOfGuests : "",
      StartDate : "",
      EndDate : "",
      Address : "",
      City : "",
      State : "",
      Zip : "",
      Rate : "",
      Amneties : "",
      Images : "",
      Files : [],
    }
  }

  titleChangeHandler = (e) =>{
    this.setState({
      Title : e.target.value
    })
  }

  descriptionChangeHandler = (e) => {
    this.setState({
      Description : e.target.value
    })
  }

  bedroomsChangeHandler = (e) => {
    this.setState({
      Bedrooms : e.target.value
    })
  }

  bathroomsChangeHandler = (e) => {
    this.setState({
      Bathrooms : e.target.value
    })
  }

  startDateChangeHandler = (e) => {
    this.setState({
      StartDate : e.target.value
    })
  }

  endDateChangehandler = (e) => {
    this.setState({
      EndDate : e.target.value
    })
  }

  addressChangeHandler = (e) => {
    this.setState({
      Address : e.target.value
    })
  }

  cityChangeHandler = (e) => {
    this.setState({
      City : e.target.value
    })
  }

  stateChangeHandler = (e) => {
    this.setState({
      State : e.target.value
    })
  }

  zipChangeHandler = (e) => {
    this.setState({
      Zip : e.target.value
    })
  }

  rateChangeHandler = (e) => {
    this.setState({
      Rate : e.target.value
    })
  }

  imagesChangeHandler = (e) => {
    this.setState({
      Images : e.target.files.length,
      Files : e.target.files,
    })
  }

  guestsChangeHandler = (e) => {
    this.setState({
      numberOfGuests : e.target.value,
    })
  }

  submitNewProperty = (e) => {
    e.preventDefault();
    console.log("Inside the submit new property request");
    const data = {
      Owner : this.props.ownerDetails.email,
      Title : this.state.Title,
      Description : this.state.Description,
      Bedrooms : this.state.Bedrooms,
      Bathrooms : this.state.Bathrooms,
      StartDate : this.state.StartDate,
      EndDate : this.state.EndDate,
      Address : this.state.Address,
      City : this.state.City,
      State : this.state.State,
      Zip : this.state.Zip,
      Rate : this.state.Rate,
      Amneties : "",
      Images : this.state.Images,
      NumberOfGuests : this.state.numberOfGuests,
    }
    console.log(data);
    var formData = new FormData();
    const files = this.state.Files;
    console.log(files);
    for(let i=0; i<files.length; i++){
      formData.append("images", files[i]);
    }
    var config = {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    }
    console.log(data);
    axios.post(BASE_URL+'/listProperty', data)
    .then((res) => {
      if(res.status == 200){
        formData.append("Title", res.data._id);
        formData.append("Owner", this.props.ownerDetails.email);
        axios.post(BASE_URL+"/uploadImages", formData, config)
          .then((response) => {
            if (response.status == 200) {
              console.log("Successfull image upload");
            }
            else {
              console.log("Error uploading");
            }
          })
        console.log("Property listed succesfully");
        this.props.history.push('/ownerDashboard');
      }
      else{
        console.log("Error listing property");
      }
    })
  }

  render(){
    let redirectVar = null;
    if(!this.props.ownerDetails.token){
        redirectVar = <Redirect to= "/ownerLogin"/>
    }
    return(
      <div>
        {/* {redirectVar} */}
        <Navbar/>
        <div class="container list-property-form">
        <div class="row">
          <div class="col-md-2">
            <ul class="nav nav-tabs nav-stacked">
              <li class="active nav-item"><a class="nav-link list-property-link" href="#details" data-toggle="tab" role="tab">Details</a></li>
                <li class="nav-item"><a class="nav-link list-property-link" href="#location" data-toggle="tab" role="tab">Location</a></li>
                <li class="nav-item"><a class="nav-link list-property-link" href="#availability" data-toggle="tab" role="tab">Availability</a></li>
                <li class="nav-item"><a class="nav-link list-property-link" href="#bedandbath" data-toggle="tab" role="tab">Bed and Baths</a></li>
                <li class="nav-item"><a class="nav-link list-property-link" href="#photos" data-toggle="tab" role="tab">Photos</a></li>
                <li class="nav-item"><a class="nav-link list-property-link" href="#payment" data-toggle="tab" role="tab">Payment</a></li>
            </ul>
          </div>
          <div class="col-md-9">
            <div class="tab-content right-pane">
              <div class="tab-pane active" id="details">
                <input type="text" class="form-control" onChange={this.titleChangeHandler} name="Title" placeholder="Headline" required />
                  <textarea rows="4" class="form-control" onChange={this.descriptionChangeHandler} name="Description" placeholder="Description" required/>
                  {/* <button class="btn btn-primary btnNext">Next</button> */}
              </div>
              <div class="tab-pane" id="location">
                  <input type="text" class="form-control" onChange={this.addressChangeHandler} name="StreetAddress" placeholder="Street Address" required/>
                  <input type="text" class="form-control" onChange={this.cityChangeHandler} name="City" placeholder="City" required/>
                  <input type="text" class="form-control" onChange={this.stateChangeHandler} name="State" placeholder="State" required/>
                  <input type="text" class="form-control" onChange={this.zipChangeHandler} name="Zip" placeholder="ZIP code" required/>
              </div>
              <div class="tab-pane" id="availability">
                  <label for="StartDate">Start Date</label>
                  <input type="date" class="form-control" onChange={this.startDateChangeHandler} name="StartDate" required/>
                  <label for="EndDate">End Date</label>
                  <input type="date" class="form-control" onChange={this.endDateChangehandler} name="EndDate" required/>
              </div>
              <div class="tab-pane" id="bedandbath">
                  <input type="text" class="form-control" onChange={this.bedroomsChangeHandler} name="Bedrooms" placeholder="Number of Bedrooms" required/>
                  <input type="text" class="form-control" onChange={this.bathroomsChangeHandler} name="Bathrooms" placeholder="Number of Bathrooms" required/>
                  <input type="text" class="form-control" onChange={this.guestsChangeHandler} name="NumberOfGuests" placeholder="Number of Guests" required />
              </div>
              <div class="tab-pane" id="photos">
                <form>
                    <input type="file" class="form-control" name="myImage" onChange={this.imagesChangeHandler} multiple />
                </form>
              </div>
              <div class="tab-pane" id="payment">
                  <input type="number" class="form-control" onChange={this.rateChangeHandler} name="Rate" placeholder="Rate" required/>
                  <button type="submit" class="btn btn-primary" onClick={this.submitNewProperty}>Done</button></div>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ownerDetails}) => ({
  ownerDetails,
})

export default connect(mapStateToProps) (ListProperty);
