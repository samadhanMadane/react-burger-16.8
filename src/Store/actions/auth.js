import axios from 'axios';
import _ from 'lodash';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, isAdmin) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        isAdmin: isAdmin
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const setIsAdminFailed = (error) => {
    return {
        type: actionTypes.SET_IS_ADMIN_FAILED,
        error: error
    }
}

export const setIsAdmin = (isAdmin) => {
    return {
        type: actionTypes.SET_IS_ADMIN,
        isAdmin: isAdmin
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let userData = {
            username: email,
            password: password
        }
        let isAdmin= false;
        axios.get('https://react-burger-ed84d.firebaseio.com/admin.json')
            .then(response => {
               
                if (_.isEqual(response.data, userData)){
                    isAdmin= true;
                }
                dispatch(setIsAdmin(isAdmin));
            })
            .catch(error => {
                dispatch(setIsAdminFailed(error));
            });

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA0lhacK959RUMt4mKFbbNS9rFRc-Ur7sU';
        if (!isSignup) {
            url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA0lhacK959RUMt4mKFbbNS9rFRc-Ur7sU';
        }
        axios.post(url, authData)
            .then( response => {
                const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationDate);
                localStorage.setItem('userId',  response.data.localId);
                localStorage.setItem('isAdmin',  isAdmin);
                dispatch(authSuccess(response.data.idToken, response.data.localId, isAdmin));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            } )
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        }
        else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if(expirationTime <= new Date()) {
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem('userId');
                const checkAdmin= localStorage.getItem('isAdmin');
                const isAdmin = (checkAdmin === 'true'); 
                dispatch(authSuccess(token, userId, isAdmin));
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) * 1000));
            }
        }
    }
}