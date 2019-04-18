import {SET_OWNER, OWNER_LOGOUT} from '../actions/types';

const ownerData = {
    email: '',
    fullName: '',
    userType: '',
    token: '',
}

export default (state = ownerData, action) => {
    switch (action.type){
        case SET_OWNER: 
            return {
                ...state,
                email: action.payload.email,
                fullName: action.payload.fullName,
                userType: 'Owner',
                token: action.payload.token,
            }
        case OWNER_LOGOUT:
            return {
                ...state,
                email : "",
                fullName : "",
                userType : "",
                token : "",
            }
        default :
            return state;
    }
}