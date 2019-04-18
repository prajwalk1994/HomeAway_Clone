import React, {Component} from 'react';
import './SearchResults.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from '../Navbar/Navbar';
import {BASE_URL} from '../../BaseUrl';
//Pagination
//Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setSearchResults, setCurrentPropertyID, setSearchQuery} from '../../actions/PropertyActions';

class SearchResults extends Component{

  constructor(props){
    super(props);
    this.state = ({
      location: '',
      startDate: '',
      endDate: '',
      numberOfGuests : '',
      currentPage: 1,
      propertiesPerPage : 10,
    })
  }

  changeCurrentPage = (e) => {
    this.setState({
      currentPage : Number(e.target.id),
    })
  }


  componentDidMount(){
    const data = this.props.searchDetails;
    console.log(data);
    this.props.setSearchResults(data);
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

  guestsChangehandler = (e) => {
    this.setState({
      numberOfGuests : e.target.value,
    })
  }

  retrieveHouseDetails = (e,id) => {
    e.preventDefault();
    this.props.setCurrentPropertyID(id);
    this.props.history.push('/propertyResults');
  }

  submitSearchDetails = () => {
    const searchData = {
      location: this.state.location,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }
    this.props.setSearchQuery(searchData);
    this.props.history.push("/searchResults");
  }

  render(){
    const currentPage = this.state.currentPage;
    const propertiesPerPage = this.state.propertiesPerPage;
    const lastProperty = currentPage * propertiesPerPage;
    const firstProperty = lastProperty - propertiesPerPage;
    let properties = this.props.searchDetails.results;
    const currentProperties = properties.slice(firstProperty, lastProperty);

    const renderProperties = currentProperties.map(property => {
      var url = BASE_URL+"/uploads/p" + property._id + "/1.jpg";
      console.log(url);
      return (
        <tr class="media" onClick={(e) => this.retrieveHouseDetails(e, property._id)}>
          <img class="mr-3 thumbnail-img" src={url} alt="No image found" />
          <div class="media-body">
            <h3>{property.Title}</h3>
            <h6> Owner : {property.Owner}</h6>
            <b>Address</b> {property.Street}<br />{property.City}<br />{property.State + " " + property.Zip}
            <p> Rate : {property.Rate} </p>
            Sleeps {property.Bedrooms * 2}
          </div>
        </tr>
      )
    })

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(properties.length / propertiesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li class="page-item">
          <a key={number} id={number} class="page-link" onClick={this.changeCurrentPage}>{number}</a>
        </li>
      );
    });

    let redirectVar = null;
    if(!this.props.travellerDetails.token){
        redirectVar = <Redirect to= "/travellerLogin"/>
      }
    return(
      <div>
        <Navbar/>
        {redirectVar}
        <form class="form-inline">
          <div class='form-group row'>
            <div class='col'>
              <input type='text' id='location' name='location' class='form-control input-lg' placeholder={this.props.searchDetails.location} onChange={this.locationChangleHandler} required />
            </div>
            <div class='col'>
              <input type='date' class="form-control input-lg" name='startDate' onChange={this.startDateChangeHandler} />
            </div>
            <div class='col'>
              <input type='date' class="form-control input-lg" name='endDate' onChange={this.endDateChangehandler} />
            </div>
            <div class='col'>
              <input type='text' class="form-control input-lg" name='numberOfGuests' onChange={this.guestsChangehandler} placeholder={this.props.searchDetails.numberOfGuests} />
            </div>
            <div class='col'>
              <button class="btn btn-primary" type='submit' onClick={this.submitSearchDetails} class='btn btn-primary'> Search </button>
            </div>
          </div>
        </form><br/><hr/><br/>
        <div class='container main-container'>
          <table class='table table-hover'>
            <tbody>
              {renderProperties}
              <br/>
              <ul class="pagination">
                {renderPageNumbers}
              </ul>
            </tbody>
          </table>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({searchDetails, travellerDetails}) => ({
  searchDetails,
  travellerDetails,
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      setCurrentPropertyID,
      setSearchResults,
      setSearchQuery,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
