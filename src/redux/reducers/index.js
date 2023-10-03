import { combineReducers } from "redux";
import { REHYDRATE } from "redux-persist";


const combinedReducers=combineReducers({authState:''})
const rootReducer=(state,action)=>{
    if(action.type===REHYDRATE){
        state=action.payload;
    }
    return combinedReducers(state,action)
}

export default rootReducer;