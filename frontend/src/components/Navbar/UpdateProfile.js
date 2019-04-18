import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import Navbar from '../Navbar/Navbar';

class UpdateProfile extends Component{
  render(){
    return(
      <div>
        <Navbar/>
        <h2> Update profile page </h2> <hr/> <br/>
        <form>
          <div class="form-group">
            <label for="fullName">Full Name:</label>
            <input type="text" class="form-control" id="fullName"/>
          </div><br/>
          <div class="form-group">
            <label for="about">About</label>
            <textarea rows="6" class="form-control" id="about"></textarea>
          </div><br/>
          <div class="form-group">
            <label for="age">Age</label>
            <input type="text" class="form-control" id="age" />
          </div><br/>
          <div class="form-group">
            <label for="languages">Languages</label>
            <input type="text" class="form-control" id="languages" />
          </div><br />
        </form>
      </div>
    )
  }
}

export default UpdateProfile;
