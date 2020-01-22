import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types';

// Load User
export const loadUser = () => async dispatch => {
    if(sessionStorage.token) {
        setAuthToken(sessionStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Prepare user data to send
    const body = JSON.stringify({ name, email, password });

    try {
        // Send API request to backend
        const res = await axios.post('/api/users', body, config);
        // If successful, send data to auth reducer
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(e => {
                dispatch(setAlert(e.msg, 'danger'));
            });
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Prepare user data to send
    const body = JSON.stringify({ email, password });

    try {
        // Send API request to backend
        const res = await axios.post('/api/auth', body, config);
        // If successful, send data to auth reducer
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(e => {
                dispatch(setAlert(e.msg, 'danger'));
            });
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
}

// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}