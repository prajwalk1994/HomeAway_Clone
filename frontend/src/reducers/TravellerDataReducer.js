import {SET_TRAVELLER, TRAVELLER_LOGOUT} from '../actions/types';

const travellerData = {
    email : '',
    fullName : '',
    userType : '',
    token : '',
}

export default (state = travellerData, action) => {
    switch (action.type) {
        case SET_TRAVELLER:
            return {
                ...state,
                email : action.payload.email,
                fullName : action.payload.fullName,
                userType : 'Traveller',
                token : action.payload.token,
            }
        case TRAVELLER_LOGOUT:
            return{
                ...state,
                email : "",
                fullName : "",
                userType : "",
                token : "",
            }
        default:
            return state;
    }
}