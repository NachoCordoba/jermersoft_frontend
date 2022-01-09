import { LOGIN, LOGOUT } from "../actions/auth.action";

/**
 * Initial State Authentification
 */
const initialState = {
    jwt: null,
    user: null
}

/**
 * Manage Authentification State
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export default function AuthReducer(state = initialState, action){
    switch(action.type){
        case LOGIN:
                return Object.assign({}, { ...action.auth });
            case LOGOUT:
                return Object.assign({}, initialState);
        default:
            return state;
    }
}