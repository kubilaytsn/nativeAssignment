import AsyncStorage from '@react-native-async-storage/async-storage';

// reducers/userReducer.ts
const initialState = {
  type: null,
};

const saveValue = async () => {
  try {
    await AsyncStorage.setItem('hideScreen', 'true');
  } catch (error) {
    console.error('AsyncStorage hatası:', error);
  }
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'hide':
      saveValue();
      return {...state, type: action.payload};
    default:
      AsyncStorage.getItem('hideScreen')
        .then(hideSrc => {
          console.log('hidesrc', hideSrc);

          if (hideSrc !== null) {
            return {...state, type: hideSrc};
          }
        })
        .catch(error => {
          console.error('AsyncStorage hatası:', error);
        });
      return state;
  }
};

export default userReducer;
