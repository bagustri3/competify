import {
    USER_LOGIN,
    USER_LOGOUT,
} from "./UserTypes";

import Cookies from 'universal-cookie';

const cookiesRead = new Cookies();
let token    = cookiesRead.get("token");
let userObj  = cookiesRead.get("user");

let user = {};
let jwtToken = {};

if(token && token.length>0){
    jwtToken = token;
    user = userObj;
}

export const userInitialState = {
    user: user,
    jwtToken: jwtToken,
};


const UserReducer = (state = userInitialState, action) => {

    switch (action.type){
        case USER_LOGIN:

            cookiesRead.set('token', action.payload.token, { path: "/"});
            cookiesRead.set('user', action.payload.user, { path: "/"});

            return{
                ...state,
                jwtToken: action.payload.token,
                user: action.payload.user,
            };
        case USER_LOGOUT:

            cookiesRead.remove('token');
            cookiesRead.remove('user');

            return{
                ...state,
                jwtToken: {},
                user: {},
            };
        default:
            return state;
    }
};

export default UserReducer;