import database from '@react-native-firebase/database';
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

// export const getInventoryData = (collection, groupName) => {
//   return async dispatch => {
//     firebase
//       .firestore()
//       .collection(collection)
//       .doc(groupName)
//       .get()
//       .then(snapshot => {
//         console.log('collectedSnap', snapshot);
//         const collectionData = snapshot.data();
//         // console.log('collectedData', collectionData);
//         // setFruitList(collectionData)
//         dispatch({
//           type: GET_DATA,
//           payload: collectionData,
//           groupName,
//         });
//       });
//     // const itemRef = database().ref('/user');
//     // itemRef.on('value', snapshot => {
//     //   const data = snapshot.val();
//     //   const itemData = Object.values(data);

//     // });
//   };
// };
// export const getInventoryList = () => {
//   return async dispatch => {
//     firebase
//       .firestore()
//       .collection('Inventory')
//       .get().then(snapshot => {
//         const collectionData = snapshot.docs.map(item => item.data());
//         // console.log('collectedData', collectionData);
//         // setFruitList(collectionData)
//         dispatch({
//           type: GET_DATA,
//           payload: collectionData,
//         });
//       });
//   };
// };

// export const addInventoryData = (collectionName, groupName, data, itemId) => {
//   return async dispatch => {
//     firebase
//       .firestore()

//       .doc(`Inventory/${collectionName}`)
//       .collection(groupName)
//       .doc(itemId)
//       .set(data)
//       .then(
//         () => {
//           dispatch({type: ADD_DATA});
//         },
//         error => {
//           console.log('some error happened', error);
//         },
//       );
//   };
// };
// export const addDataToFireStore = (collectionName, groupName, data) => {
//   return async dispatch => {
//     firebase
//       .firestore()

//       .collection(`${collectionName}`)
//       .doc(groupName)
//       .set(data)
//       .then(
//         () => {
//           dispatch({type: ADD_DATA});
//         },
//         error => {
//           console.log('some error happened', error);
//         },
//       );
//   };
// };
// export const addDataToFireStore = data => {
//   return async dispatch => {
//     firebase
//       .firestore()

//       .collection('Inventory')
//       .doc(`${data.itemId}`)

//       .set(data)
//       .then(
//         () => {
//           dispatch({type: ADD_DATA});
//         },
//         error => {
//           console.log('some error happened', error);
//         },
//       );
//   };
// };
export const getDataFromIncomingInventory = getCollection => {
  return async dispatch => {
    firebase
      .firestore()
      .collection(`IncomingInventory`)
      .get()
      .then(
        snapshot => {
          // console.log('SnapShot', snapshot.docs);
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
          // console.log('doc not fount adding to new');
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
        console.log(data.count, count);
        if (Number(data.count) > Number(count)) {
          ref.doc(id).update({
            count: Number(data.count) - Number(count),
          });

          // Add update dispatch
          dispatch({type: UPDATE_INVENTORY, payload: {id, count}});
          // navigation.goBack();
        } else {
          ref
            .doc(id)
            .delete()
            .then(
              () => {
                dispatch({type: DELETE_INVENTORY, payload: id});
                console.log(`successfully deleted`);
                // navigation.goBack();
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
          // updateInventory(data.itemGroupId, data.count);
        } else {
          console.log('item group not sold yet');
          refToSoldInventory
            .doc(data.itemGroupId)
            .set(data)
            .then(
              () => {
                dispatch({type: ADD_TO_SOLD_INVENTORY, payload: data});
                // updateInventory(data.itemGroupId, data.count);
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
