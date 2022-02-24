import {GET_DATA} from '../actions/DBAction';

const initialState = {
  storeData: [],
};

export default function DBReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {...state, storeData: action.payload};
    default:
      return state;
  }
}
