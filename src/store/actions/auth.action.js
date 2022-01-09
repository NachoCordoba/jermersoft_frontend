export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

/**
 * System LogIn
 * @param {*} payload 
 * @returns 
 */
export function login(payload){
    return {
        type: LOGIN,
        auth:{
            jwt: payload.jwt,
            user: payload.user
        }
    }
}

/**
 * System Logout
 * @returns 
 */
export function logout(){
    return {
        type: LOGOUT
    }
}