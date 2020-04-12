import { fetchCountry } from '../api'

// action types
export const REQUEST_SENT = 'REQUEST_SENT';
export const REQUEST_FULFILLED = 'REQUEST_FULFILLED';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';
export const CLEAR_COUNTRIES = 'CLEAR_COUNTRIES';


// action creators
export const clearCountries = () => ({
    type: CLEAR_COUNTRIES, 
    payload: [],
})

// async action creator
export const saveCountries = () => async dispatch => {
    dispatch({type: REQUEST_SENT})
    try {
        const countries = await fetchCountry()
        dispatch({type: REQUEST_FULFILLED, payload: countries})
    }catch (err){
        dispatch({type: REQUEST_REJECTED, payload: err.message})
    }
}

