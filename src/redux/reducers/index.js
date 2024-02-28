import { combineReducers } from 'redux'
import { REHYDRATE } from 'redux-persist/lib/constants'
import dataUser from './authReducer'

const combinedReducers = combineReducers({ authState: dataUser })
const rootReducer = (state, action) => {
    if (action.type === REHYDRATE) {
        console.log(action.payload)
        state = action.payload
    }
    return combinedReducers(state, action)
}

export default rootReducer
