import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { RegisterAction, AuthActionTypes } from '../store/types/AuthTypes';
import { API_URL } from '.';

export interface RegisterRequestBody {
    name: string,
    username: string,
    password: string,
    repeat: string
}

export const registerRequest = (body : RegisterRequestBody) => {
    return async (dispatch : Dispatch<RegisterAction>) => {
        try {
            dispatch({type: AuthActionTypes.REGISTER_USER})
            const response = await axios.post(`${API_URL}/auth/register`, body)
            dispatch({
                type: AuthActionTypes.REGISTER_USER_SUCCESS, message: response.data
            })
        }
        catch(error) {
            if(axios.isAxiosError(error)) {
                dispatch({
                    type: AuthActionTypes.REGISTER_USER_ERROR, errors: error.response?.data
                })
            }
        }
    }
}