import React, { Component } from 'react';
import axios from 'axios';
import {BASE_URL} from '../../BaseUrl';
//Redux
import {connect} from 'react-redux';


class TravellerInbox extends Component {

    constructor(props){
        super(props);
        this.state = {
            Messages : [],
            replyMessage : "",
        }
    }

    replyChangeHandler = (e) => {
        this.setState({
            replyMessage : e.target.value,
        })
    }

    componentDidMount(){
        const data = {
            Type : "Traveller",
            Traveller : this.props.travellerDetails.email,
        }
        axios.post(BASE_URL+"/getMessage", data)
            .then((response) => {
                if(response.status == 200){
                    this.setState({
                        Messages : this.state.Messages.concat(response.data),
                    })
                }else{
                    alert("Error fetching Messages. Please try again");
                    this.props.history.push("/travellerDashboard");
                }
            })
    }

    sendMessage = (e,owner) => {
        e.preventDefault();
        const data = {
            Traveller : this.props.travellerDetails.email,
            Owner : owner,
            Text : this.state.replyMessage,
            Type : "Owner"
        }
        axios.post(BASE_URL+"/setMessage", data)
            .then((response) => {
                if(response.status ==200){
                    alert("Message sent to "+data.Owner+" Successfully");
                }
                else{
                    alert("Error sending message. Please try again");
                }
            })
    }

  render() {

    let renderMessages = this.state.Messages.slice(0).reverse().map((message, index) => {
        if(!message){
            return(<tr>No messages found</tr>)
        } else{
            return(
                <tr>
                    <td>{message.Owner}</td>
                    <td>{message.Text}</td>
                    <td>
                        <button type="button" data-toggle="collapse" data-target={"#m"+message._id} class="btn btn-primary">Reply</button>
                        <div class="collapse" id={"m"+message._id}><br/>
                        <form class="form-inline">
                            <textarea class="form-control" name="replyMessage" onChange={this.replyChangeHandler}></textarea>
                            <button class="btn btn-primary" onClick={(e) => this.sendMessage(e,message.Owner)}>Send</button>
                        </form>
                        </div>
                    </td>
                </tr>
            )
        }
    })

    return (
      <div>
        <br/><hr/><br/>
        <h1>Inbox</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>From</th>
                    <th>Message</th>
                    <th>Reply</th>
                </tr>
            </thead>
            <tbody>
                {renderMessages}
            </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({travellerDetails}) => ({
    travellerDetails,
})

export default connect(mapStateToProps)(TravellerInbox);