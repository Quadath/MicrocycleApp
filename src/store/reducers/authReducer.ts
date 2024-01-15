import { AuthActionTypes, RegisterAction } from "../types/AuthTypes";

interface RegisterState {
    message: string,
    loading: boolean,
    errors: null | any
}

const initialState: RegisterState = {
    message: '',
    loading: false,
    errors: null
}

export const registerReducer = (state = initialState, action: RegisterAction) : RegisterState => {
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
