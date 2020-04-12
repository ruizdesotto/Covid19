import {combineReducers} from 'redux'

import {CLEAR_COUNTRIES, REQUEST_FULFILLED, REQUEST_REJECTED} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next);

const countryReducer = (state = [], action) => {
    switch (action.type){
        case REQUEST_FULFILLED:
            return [...state, ...action.payload]
        case REQUEST_REJECTED:
            return merge(state, {err: action.payload})
        case CLEAR_COUNTRIES:
            return action.payload
        default: 
            return state
    }
}

const listReducer = (state = [], action) => {
    switch (action.type){
        case REQUEST_FULFILLED:
            list = action.payload.map((country) => ({name: country.name, key:country.key}))
            return [...state, ...list]
        case CLEAR_COUNTRIES:
            return action.payload
        default: 
            return state
    }
}
 
const reducer = combineReducers({
    countriesInfo: countryReducer,
    countriesList: listReducer,
})

export default reducer