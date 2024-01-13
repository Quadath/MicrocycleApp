export enum AuthActionTypes {
    REGISTER_USER = 'REGISTER_USER',
    REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
    REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
    LOGIN_USER = "LOGIN",
    LOGIN_USER_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_USER_ERROR = 'LOGIN_ERROR'
}

interface RegisterUserAction {
    type: AuthActionTypes.REGISTER_USER
}
interface RegisterUserSuccessAction {
    type: AuthActionTypes.REGISTER_USER_SUCCESS
    message: string
}
interface RegisterUserErrorAction {
    type: AuthActionTypes.REGISTER_USER_ERROR
    errors: any
}

interface LoginUserAction {
    type: AuthActionTypes.LOGIN_USER
}
interface LoginUserSuccessAction {
    type: AuthActionTypes.LOGIN_USER_SUCCESS
    message: string
}
interface LoginUserErrorAction {
    type: AuthActionTypes.LOGIN_USER_ERROR
    errors: any
}

export type RegisterAction = RegisterUserAction | RegisterUserSuccessAction | RegisterUserErrorAction
export type LoginAction = LoginUserAction | LoginUserSuccessAction | LoginUserErrorAction


