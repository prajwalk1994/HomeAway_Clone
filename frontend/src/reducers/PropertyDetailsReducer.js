import {SET_PROPERTY, SET_CURRENT_PROPERTY} from '../actions/types';

const propertyDetails = {
    currentPropertyID : '',
    property : {}
}

export default (state = propertyDetails, action) => {
    switch(action.type){
        case SET_PROPERTY:
        return{
            ...state,
            property : action.payload,
        }
        case SET_CURRENT_PROPERTY:
        return{
            ...state,
            currentPropertyID : action.payload,
        }
        default : 
        return state;
    }

}