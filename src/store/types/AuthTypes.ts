export enum AuthActionTypes {
    REGISTER_LOADING = 'REGISTER_LOADING',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_ERROR = 'REGISTER_ERROR',
    LOGIN_LOADING = "LOGIN_LOADING",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_ERROR = 'LOGIN_ERROR',
    SESSION_LOADING = 'SESSION_LOADING',
    SESSION_SUCCESS = 'SESSION_SUCCESS',
    SESSION_ERROR = 'SESSION_ERROR'
}

export interface IUser {
    name: String
    username: String
    stats: any
}

interface RegisterUserAction {
    type: AuthActionTypes.REGISTER_LOADING
}
interface RegisterUserSuccessAction {
    type: AuthActionTypes.REGISTER_SUCCESS
    message: string
}
interface RegisterUserErrorAction {
    type: AuthActionTypes.REGISTER_ERROR
    error: any
}
export type RegisterAction = RegisterUserAction | RegisterUserSuccessAction | RegisterUserErrorAction


interface LoginUserAction {
    type: AuthActionTypes.LOGIN_LOADING
}
interface LoginUserSuccessAction {
    type: AuthActionTypes.LOGIN_SUCCESS
    message: string
}
interface LoginUserErrorAction {
    type: AuthActionTypes.LOGIN_ERROR
    error: any
}
export type LoginAction = LoginUserAction | LoginUserSuccessAction | LoginUserErrorAction


export enum SessionActionTypes {
    
}

interface SessionLoadAction {
    type: AuthActionTypes.SESSION_LOADING
}
interface SessionLoadSuccessAction {
    type: AuthActionTypes.SESSION_SUCCESS
    user: IUser
}
interface SessionLoadErrorAction {
    type: AuthActionTypes.SESSION_ERROR
    error: any
}
export type SessionAction = SessionLoadAction | SessionLoadSuccessAction | SessionLoadErrorAction