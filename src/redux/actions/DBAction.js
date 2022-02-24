import database from '@react-native-firebase/database';

export const GET_DATA = 'GET_DATA';

export const getInventoryData = () => {
  return async dispatch => {
    let itemData = [];
    const itemRef = database().ref('/user');
    itemRef.on('value', snapshot => {
      const data = snapshot.val();
      itemData = Object.values(data);

      dispatch({type: GET_DATA, payload: itemData});
    });
  };
};
