import {SET_SEARCH_QUERY, SET_PROPERTY, SET_SEARCH_RESULTS, SET_CURRENT_PROPERTY} from './types';
import axios from 'axios';
import {BASE_URL} from '../BaseUrl';

export const setPropertyDetails = (data) => dispatch =>{
    axios.post(BASE_URL+"/getPropertyResult", data)
        .then((res) => {
            if(res.status == '200'){
                dispatch({
                    type : SET_PROPERTY,
                    payload : res.data,
                })
            } else {
                dispatch({
                    type : SET_PROPERTY,
                    payload : {},
                })
            }
        })
}

export const setSearchQuery = (data) => dispatch => {
    dispatch({
        type : SET_SEARCH_QUERY,
        payload : data,
    })
}

export const setCurrentPropertyID = (data) => dispatch => {
    dispatch({
        type : SET_CURRENT_PROPERTY,
        payload : data
    })
}

export const setSearchResults = (data) => dispatch => {
    axios.post(BASE_URL+'/getProperties', data)
        .then((res) => {
            if(res.status == '200'){
                dispatch({
                    type : SET_SEARCH_RESULTS,
                    payload : res.data,
                })
            }
            else {
                dispatch({
                    type : SET_SEARCH_RESULTS,
                    payload : res.data,
                })
            }
        });
}