import {SET_TRAVELLER, SET_OWNER, TRAVELLER_LOGOUT, OWNER_LOGOUT} from './types';
import axios from 'axios';
import {BASE_URL} from '../BaseUrl';

export const authenticateTraveller = (data) => dispatch =>{
    axios.post(BASE_URL+'/travellerLogin', data)
        .then(response => {
            console.log(response.data);
            if (response.status == "200") {
                dispatch({
                    type : SET_TRAVELLER,
                    payload : response.data
                })
            } else {
                dispatch({
                    type : SET_TRAVELLER,
                    payload : {}
                })
            }
        })
    }

    export const logoutTraveller = () => dispatch => {
        dispatch({
            type : TRAVELLER_LOGOUT,
            payload : [],
        })
    }

    export const authenticateOwner = (data) => dispatch =>{
        axios.post(BASE_URL+'/ownerLogin', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status == "200") {
                    dispatch({
                        type: SET_OWNER,
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: SET_OWNER,
                        payload: {}
                    })
                }
            })
    }

export const logoutOwner = () => dispatch => {
    dispatch({
        type: OWNER_LOGOUT,
        payload: [],
    })
}
