import { AuthActionTypes, RegisterAction, LoginAction } from "../types/AuthTypes";

interface RegisterState {
    message: string,
    loading: boolean,
    error: null | any
}

const registerInitialState: RegisterState = {
    message: '',
    loading: false,
    error: null
}

export const registerReducer = (state = registerInitialState, action: RegisterAction) : RegisterState => {
    switch (action.type) {
        case AuthActionTypes.REGISTER_USER:
            return {message : '', loading: true, error: null}
        case AuthActionTypes.REGISTER_USER_SUCCESS: 
            return {message: 'Account successfully registered', loading: false, error: null}
        case AuthActionTypes.REGISTER_USER_ERROR: 
            return {message: "Error", loading: false, error: action.error}
        default: 
            return state;
    }
}

interface LoginState {
    message: string
    loading: boolean,
    error: null | any
}

const loginInitialState: LoginState = {
    message: '',
    loading: false,
    error: null
}

export const loginReducer = (state = loginInitialState, action: LoginAction) : LoginState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_USER:
            return {message : '', loading: true, error: null}
        case AuthActionTypes.LOGIN_USER_SUCCESS: 
            return {message: 'Successfully logged in', loading: false, error: null}
        case AuthActionTypes.LOGIN_USER_ERROR: 
            return {message: "Error", loading: false, error: action.error}
        default: 
            return state;
    }
}
