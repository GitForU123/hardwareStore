import {ADD_DATA, GET_DATA, GET_LIST} from '../actions/DBAction';

const initialState = {
  storeData: [],

  collectionList: [],
};

export default function DBReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      // return {...state, data: {...data, group: [...group, action.payload]}};
      // return {...state, data: action.payload};
      return {
        ...state,
        storeData: action.payload,
      };
    case ADD_DATA:
      return state;

    default:
      return state;
  }
}
