import {firebase} from '@react-native-firebase/firestore';

export const GET_DATA = 'GET_DATA';
export const GET_DATA_FROM_INVENTORY = 'GET_DATA_FROM_INVENTORY';
export const ADD_DATA = 'ADD_DATA';
export const ADD_DATA_TO_INVENTORY = 'ADD_DATA_TO_INVENTORY';
export const ADD_TO_SOLD_INVENTORY = 'ADD_TO_SOLD_INVENTORY';
export const GET_SOLD_INVENTORY = 'GET_SOLD_INVENTORY';
export const UPDATE_SOLD_INVENTORY = 'UPDATE_SOLD_INVENTORY';
export const UPDATE_INVENTORY = 'UPDATE_INVENTORY';
export const DELETE_INVENTORY = 'DELETE_INVENTORY';
export const GET_LIST = 'GET_LIST';

export const getDataFromIncomingInventory = getCollection => {
  return async dispatch => {
    firebase
      .firestore()
      .collection(`IncomingInventory`)
      .get()
      .then(
        snapshot => {
          const data = snapshot.docs.map(doc => doc.data());
          dispatch({type: GET_DATA_FROM_INVENTORY, payload: data});
          getCollection(snapshot.docs.map(doc => doc.data()));
          // return data;
        },
        error => {
          console.log('error listening to snapshot', error);
        },
      );
  };
};
export const addDataToIncomingInventory = data => {
  return async dispatch => {
    const refFireStoreDoc = firebase
      .firestore()

      .collection('IncomingInventory');

    refFireStoreDoc
      .doc(`${data.itemGroupId}`)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          refFireStoreDoc.doc(`${data.itemGroupId}`).update({
            count: Number(data.count) + Number(snapshot.data().count),
          });
          dispatch({
            type: UPDATE_INVENTORY,
            payload: {id: data.itemGroupId, count: data.count},
          });
        } else {
          refFireStoreDoc
            .doc(`${data.itemGroupId}`)
            .set(data)
            .then(
              () => {
                dispatch({type: ADD_DATA_TO_INVENTORY, payload: data});
              },
              error => {
                console.log('some error happened', error);
              },
            );
        }
      });
  };
};

export const updateCurrentInventory = (id, count) => {
  return async dispatch => {
    const ref = firebase.firestore().collection('IncomingInventory');

    ref
      .doc(id)
      .get()
      .then(snapshot => {
        const data = snapshot.data();

        if (Number(data.count) > Number(count)) {
          ref.doc(id).update({
            count: Number(data.count) - Number(count),
          });

          // Add update dispatch
          dispatch({type: UPDATE_INVENTORY, payload: {id, count}});
        } else {
          ref
            .doc(id)
            .delete()
            .then(
              () => {
                dispatch({type: DELETE_INVENTORY, payload: id});
                console.log(`successfully deleted`);
              },
              () => {
                console.log(`some error happened in deleting item`);
              },
            );
        }
      });
  };
};

export const addToSoldInventory = data => {
  return async dispatch => {
    const refToSoldInventory = firebase
      .firestore()

      .collection('SoldInventory');

    refToSoldInventory
      .doc(`${data.itemGroupId}`)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          console.log('item exists in sold inventory');
          refToSoldInventory.doc(data.itemGroupId).update({
            count: Number(data.count) + Number(snapshot.data().count),
          });
          dispatch({type: UPDATE_SOLD_INVENTORY, payload: data});
        } else {
          console.log('item group not sold yet');
          refToSoldInventory
            .doc(data.itemGroupId)
            .set(data)
            .then(
              () => {
                dispatch({type: ADD_TO_SOLD_INVENTORY, payload: data});
              },
              error => {
                console.log('some error happened', error);
              },
            );
        }
      });
  };
};

export const getSoldInventory = () => {
  return async dispatch => {
    firebase
      .firestore()
      .collection('SoldInventory')
      .get()
      .then(snapshot => {
        const dataList = snapshot.docs.map(item => item.data());

        dispatch({type: GET_SOLD_INVENTORY, payload: dataList});
      });
  };
};
