import {SET_SEARCH_QUERY, SET_SEARCH_RESULTS} from '../actions/types';

const searchQuery = {
    location : '',
    startDate : '',
    endDate : '',
    numberOfGuests : '',
    results : [],
}

export default (state = searchQuery, action) => {
    switch (action.type){
        case SET_SEARCH_QUERY : 
            return{
                ...state,
                location : action.payload.location,
                startDate : action.payload.startDate,
                endDate : action.payload.endDate,
                numberOfGuests : action.payload.numberOfGuests,
            }
        case SET_SEARCH_RESULTS :
            return{
                ...state,
                results : action.payload,
            }
        default :
            return state;
    }
}