import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/firestore';

export const GET_DATA = 'GET_DATA';
export const ADD_DATA = 'ADD_DATA';
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
export const getInventoryList = () => {
  return async dispatch => {
    firebase
      .firestore()
      .collection('Inventory')
      .onSnapshot(snapshot => {
        const collectionData = snapshot.docs.map(item => item.data());
        // console.log('collectedData', collectionData);
        // setFruitList(collectionData)
        dispatch({
          type: GET_DATA,
          payload: collectionData,
        });
      });
  };
};

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
export const addDataToFireStore = data => {
  return async dispatch => {
    firebase
      .firestore()

      .collection('Inventory')
      .doc(`${data.itemId}`)

      .set(data)
      .then(
        () => {
          dispatch({type: ADD_DATA});
        },
        error => {
          console.log('some error happened', error);
        },
      );
  };
};
