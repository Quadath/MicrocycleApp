import { combineReducers } from "@reduxjs/toolkit";
import { exerciseReducer } from "./exerciseReducer";
import { registerReducer, loginReducer, sessionReducer } from "./authReducer";

export const rootReducer = combineReducers({
    exercises: exerciseReducer,
    register: registerReducer,
    login: loginReducer,
    session: sessionReducer,
})