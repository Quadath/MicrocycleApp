import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { AuthActionTypes, RegisterAction, LoginAction, SessionAction} from '../store/types/AuthTypes';
import { API_URL } from '.';

export interface RegisterRequestBody {
    name: string,
    username: string,
    password: string,
    repeat: string
}

export interface LoginRequestBody {
    username: string,
    password: string
}

export const registerRequest = (body : RegisterRequestBody) => {
    return async (dispatch : Dispatch<RegisterAction>) => {
        try {
            dispatch({type: AuthActionTypes.REGISTER_LOADING})
            const response = await axios.post(`${API_URL}/auth/register`, body)
            dispatch({
                type: AuthActionTypes.REGISTER_SUCCESS, message: response.data
            })
        }
        catch(error) {
            if(axios.isAxiosError(error)) {
                dispatch({
                    type: AuthActionTypes.REGISTER_ERROR, error: error.response ? error.response?.data.errors[0].msg : "Server is down."
                })
            }
        }
    }
}

export const loginRequest = (body : LoginRequestBody) => {
    return async (dispatch : Dispatch<LoginAction>) => {
        try {
            dispatch({type: AuthActionTypes.LOGIN_LOADING})
            const response = await axios.post(`${API_URL}/auth/login`, body, {withCredentials: true})
            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS, message: response.data
            })
        }
        catch(error) {
            if(axios.isAxiosError(error)) {
                dispatch({
                    type: AuthActionTypes.LOGIN_ERROR, error: error.response ? error.response?.data.errors[0].msg : "Server is down."
                })
            }
        }
    }
}


export const getCurrentUser = () => {
    return async (dispatch : Dispatch<SessionAction>) => {
        try {
            dispatch({type: AuthActionTypes.SESSION_LOADING})
            const response = await axios.get(`${API_URL}/auth/me`, {withCredentials: true})
            dispatch({
                type: AuthActionTypes.SESSION_SUCCESS, user: response.data
            })
        }
        catch(error) {
            if(axios.isAxiosError(error)) {
                dispatch({
                    type: AuthActionTypes.SESSION_ERROR, error: error.response?.data
                })
            }
        }
    }
}
