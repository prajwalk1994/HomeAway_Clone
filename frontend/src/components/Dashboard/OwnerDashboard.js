import React,{Component} from 'react';
import axios from 'axios';
import './OwnerDashboard.css';
import Navbar from '../Navbar/Navbar';
import {Redirect} from 'react-router';
import OwnerInbox from './OwnerInbox';
import {BASE_URL} from '../../BaseUrl';
//Redux
import {connect} from 'react-redux';

class OwnerDashboard extends Component{
    constructor(props){
      super(props);
      this.state = {
        properties : [],
        currentPage : 1,
        propertiesPerPage : 5,
      }
    }

    componentWillMount(){
      const data = {
        Owner : this.props.ownerDetails.email,
      }
      axios.post(BASE_URL+'/retrieveOwnerProperties',data)
        .then((response) => {
          this.setState({
            properties : this.state.properties.concat(response.data)
          })
          console.log(response.data);
        })

    }

  changeCurrentPage = (e) => {
    this.setState({
      currentPage: Number(e.target.id),
    })
  }

    render(){

      const currentPage = this.state.currentPage;
      const propertiesPerPage = this.state.propertiesPerPage;
      const lastProperty = currentPage * propertiesPerPage;
      const firstProperty = lastProperty - propertiesPerPage;
      let properties = this.state.properties;
      const currentProperties = properties.slice(firstProperty, lastProperty);

      var propertyDetails = currentProperties.map(property => {
        return(
          <tr>
            <td>{property.Title}</td>
            <td>{property.Description}</td>
            <td>{property.Bedrooms}</td>
            <td>{property.Bathrooms}</td>
            <td>{property.Rate}</td>
            <td>{(!property.Bookings || property.Bookings.length == 0) ? "No" : property.Bookings[property.Bookings.length-1].Traveller}</td>
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
      if(!this.props.ownerDetails.token){
          redirectVar = <Redirect to= "/ownerLogin"/>
        }
      return(
        <div>
        <Navbar/>
          {redirectVar}
          <div class='container owner-dashboard'>
          <nav>
            <div class="nav nav-tabs" id="owner-tab" role="tablist">
                <a class="nav-item nav-link active" id="owner-properties-tab" data-toggle="tab" href="#owner-properties" role="tab">Properties</a>
                <a class="nav-item nav-link" id="owner-inbox-tab" data-toggle="tab" href="#owner-inbox" role="tab">Inbox</a>
            </div>
          </nav>
          <div class="tab-content" id="owner-tabs">
              <div class="tab-pane fade show active" id="owner-properties" role="tabpanel">
                <table class='table'>
                  <thead>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Bedrooms</th>
                    <th>Bathrooms</th>
                    <th>Rate</th>
                    <th>Booked</th>
                  </thead>
                  <tbody>
                    {propertyDetails}
                  </tbody>
                  <ul class="pagination">
                    {renderPageNumbers}
                  </ul>
                </table>
              </div>
              <div class="tab-pane fade" id="owner-inbox" role="tabpanel">
                <OwnerInbox/>
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

export default connect(mapStateToProps)(OwnerDashboard);
