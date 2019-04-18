import {combineReducers} from 'redux';
import travellerDetails from './TravellerDataReducer';
import propertyDetails from './PropertyDetailsReducer';
import searchDetails from './SearchDetailsReducer';
import ownerDetails from './OwnerDataReducer';

export default combineReducers({
    propertyDetails,
    travellerDetails,
    searchDetails,
    ownerDetails,
});

