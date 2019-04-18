import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import TravellerLogin from '../Login/TravellerLogin';
import OwnerLogin from '../Login/OwnerLogin';
import Homepage from '../Homepage/Homepage';
import OwnerSignup from '../Signup/OwnerSignup';
import TravellerSignup from '../Signup/TravellerSignup';
import SearchResults from '../SearchResults/SearchResults';
import OwnerDashboard from '../Dashboard/OwnerDashboard';
import UpdateProfile from '../Navbar/UpdateProfile';
import ListProperty from '../PropertyListing/ListProperty';
import PropertyResults from '../SearchResults/PropertyResults';
import TravellerDashboard from '../Dashboard/TravellerDashboard';
import TravellerInbox from '../Dashboard/TravellerInbox';
import OwnerInbox from '../Dashboard/OwnerInbox';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
              <Route exact path="/" component={Homepage}/>
              <Route path='/travellerLogin' component={TravellerLogin}/>
              <Route path='/ownerLogin' component={OwnerLogin}/>
              <Route path='/travellerSignup' component={TravellerSignup}/>
              <Route path='/ownerSignup' component={OwnerSignup}/>
              <Route path='/searchResults' component={SearchResults}/>
              <Route path='/ownerDashboard' component={OwnerDashboard}/>
              <Route path='/travellerDashboard' component={TravellerDashboard}/>
              <Route path='/updateProfile' component={UpdateProfile}/>
              <Route path='/listProperty' component={ListProperty}/>
              <Route path='/propertyResults' component={PropertyResults}/>
              <Route path='/travellerInbox' component={TravellerInbox}/>
              <Route path='/ownerInbox' component={OwnerInbox} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;
