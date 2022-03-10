import {
  ADD_DATA,
  GET_DATA,
  GET_LIST,
  ADD_DATA_TO_INVENTORY,
  ADD_TO_SOLD_INVENTORY,
  GET_DATA_FROM_INVENTORY,
  UPDATE_INVENTORY,
  DELETE_INVENTORY,
  GET_SOLD_INVENTORY,
  UPDATE_SOLD_INVENTORY,
} from '../actions/DBAction';

const initialState = {
  storeData: [],

  soldList: [],
};

// console.log(state.storeData);
export default function DBReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_FROM_INVENTORY:
      return {...state, storeData: action.payload};
    case ADD_DATA_TO_INVENTORY:
      return {...state, storeData: [...state.storeData, action.payload]};
    case ADD_TO_SOLD_INVENTORY:
      return {...state, soldList: [...state.soldList, action.payload]};
    case GET_SOLD_INVENTORY:
      return {...state, soldList: action.payload};

    case UPDATE_SOLD_INVENTORY:
      return {
        ...state,
        soldList: soldList.map(item => {
          if (item.itemGroupId === action.payload.itemGroupId) {
            return {
              ...item,
              count: item.count - action.payload.count,
            };
          }
          return item;
        }),
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        storeData: storeData.filter(
          item => item.itemGroupId !== action.payload.id,
        ),
      };

    case UPDATE_INVENTORY:
      return {
        ...state,
        storeData: storeData.map(item => {
          if (item.itemGroupId === action.payload.id) {
            return {
              ...item,
              count: item.count - action.payload.count,
            };
          }
          return item;
        }),
      };

    default:
      return state;
  }
}
