import React,{Component} from 'react';
import axios from 'axios';
import TravellerInbox from './TravellerInbox';
import Navbar from '../Navbar/Navbar';
import {Redirect} from 'react-router';
import {BASE_URL} from '../../BaseUrl';
//Redux
import {connect} from 'react-redux';

class TravellerDashboard extends Component{
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
        traveller : this.props.travellerDetails.email,
      }
      axios.post(BASE_URL+'/retrieveTravellerProperties',data)
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
            <td>{new Date(property.StartDate).toLocaleDateString()}</td>
            <td>{new Date(property.EndDate).toLocaleDateString()}</td>
          </tr>
        )
      })
      let redirectVar = null;
      if(!this.props.travellerDetails.token){
          redirectVar = <Redirect to= "/travellerLogin"/>
        }

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

      return(
        <div>
        <Navbar/>
          {redirectVar}
          <div class='container traveller-dashboard'>
            <nav>
              <div class="nav nav-tabs" id="traveller-tab" role="tablist">
                <a class="nav-item nav-link active" id="traveller-properties-tab" data-toggle="tab" href="#traveller-properties" role="tab">Properties</a>
                <a class="nav-item nav-link" id="traveller-inbox-tab" data-toggle="tab" href="#traveller-inbox" role="tab">Inbox</a>
              </div>
            </nav>
            <div class="tab-content" id="owner-tabs">
              <div class="tab-pane fade show active" id="traveller-properties" role="tabpanel">
            <table class='table'>
              <thead>
                <th>Title</th>
                <th>Description</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Rate</th>
                <th>Start Date</th>
                <th>End Date</th>
              </thead>
              <tbody>
                {propertyDetails}
              </tbody>
                  <ul class="pagination">
                    {renderPageNumbers}
                  </ul>
            </table>
            </div>
              <div class="tab-pane fade" id="traveller-inbox" role="tabpanel">
                <TravellerInbox/>
              </div>
            </div>
          </div>
        </div>
      )
    }
    }

  const mapStateToProps = ({travellerDetails}) => ({
    travellerDetails,
  })

export default connect(mapStateToProps)(TravellerDashboard);
