import { combineReducers } from "@reduxjs/toolkit";
import { exerciseReducer } from "./exerciseReducer";
import { registerReducer, loginReducer } from "./authReducer";

export const rootReducer = combineReducers({
    exercises: exerciseReducer,
    register: registerReducer,
    login: loginReducer
})