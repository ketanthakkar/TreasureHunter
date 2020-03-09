import { combineReducers } from 'redux';
import {
    CREATE_NEWBOARD, CHECK_TREASURES
  } from '../actions';

export const newboard = (state = {message: ""}, action) => {
    switch (action.type) {
      case CREATE_NEWBOARD:
        return {
          ...state,
          message: action.message,
        };
  
      default:
        return state;
    }
};

export const treasureData = (state = {treasure: []}, action) => {
    switch (action.type) {
      case CHECK_TREASURES:
        return {
          ...state,
          treasure: action.treasure,
        };
  
      default:
        return state;
    }
};

export default combineReducers({
    newboard, treasureData,
});