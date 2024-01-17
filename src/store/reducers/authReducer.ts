import { AuthActionTypes, RegisterAction, LoginAction, SessionAction, IUser } from "../types/AuthTypes";

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
        case AuthActionTypes.REGISTER_LOADING:
            return {message : '', loading: true, error: null}
        case AuthActionTypes.REGISTER_SUCCESS: 
            return {message: 'Account successfully created!', loading: false, error: null}
        case AuthActionTypes.REGISTER_ERROR: 
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
        case AuthActionTypes.LOGIN_LOADING:
            return {message : '', loading: true, error: null}
        case AuthActionTypes.LOGIN_SUCCESS: 
            return {message: 'Successfully logged in!', loading: false, error: null}
        case AuthActionTypes.LOGIN_ERROR: 
            return {message: "Error", loading: false, error: action.error}
        default: 
            return state;
    }
}

interface SessionState {
    user: IUser | null
    loading: boolean
    error: string[] | null
}

const sessionInitialState : SessionState = {
    user: null,
    loading: true,
    error: null
}

export const sessionReducer = (state = sessionInitialState, action : SessionAction) : SessionState => {
    switch (action.type) {
        case AuthActionTypes.SESSION_LOADING:
            return {user: null, loading: true, error : null}
        case AuthActionTypes.SESSION_SUCCESS: 
            return {user: action.user, loading : false, error : null}
        case AuthActionTypes.SESSION_ERROR: 
            return {user: null, loading: false, error : action.error}
        default: 
            return state;
    }
}
