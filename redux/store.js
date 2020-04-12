import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'
import {saveCountries} from './actions'

export const store = createStore(reducer, applyMiddleware(thunk))

store.dispatch(saveCountries())



// NOT YET ...
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native';

// const persistConfig = {
//   key: 'root',
//   version: 0,
//   storage: AsyncStorage,
// }
// const persistedReducer = persistReducer(persistConfig, reducer)
// export const persistor = persistStore(store)