import { AuthActionTypes, RegisterAction, LoginAction } from "../types/AuthTypes";

interface RegisterState {
    message: string,
    loading: boolean,
    errors: null | any
}

const registerInitialState: RegisterState = {
    message: '',
    loading: false,
    errors: null
}

export const registerReducer = (state = registerInitialState, action: RegisterAction) : RegisterState => {
    switch (action.type) {
        case AuthActionTypes.REGISTER_USER:
            return {message : '', loading: true, errors: null}
        case AuthActionTypes.REGISTER_USER_SUCCESS: 
            return {message: 'Account successfully registered', loading: false, errors: null}
        case AuthActionTypes.REGISTER_USER_ERROR: 
            return {message: "Error", loading: false, errors: action.errors}
        default: 
            return state;
    }
}

interface LoginState {
    message: string
    loading: boolean,
    errors: null | any
}

const loginInitialState: LoginState = {
    message: '',
    loading: false,
    errors: null
}

export const loginReducer = (state = loginInitialState, action: LoginAction) : LoginState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_USER:
            return {message : '', loading: true, errors: null}
        case AuthActionTypes.LOGIN_USER_SUCCESS: 
            return {message: 'Successfully logged in', loading: false, errors: null}
        case AuthActionTypes.LOGIN_USER_ERROR: 
            return {message: "Error", loading: false, errors: action.errors}
        default: 
            return state;
    }
}
