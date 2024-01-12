import { combineReducers } from "@reduxjs/toolkit";
import { exerciseReducer } from "./exerciseReducer";
import { registerReducer } from "./authReducer";

export const rootReducer = combineReducers({
    exercises: exerciseReducer,
    register: registerReducer
})