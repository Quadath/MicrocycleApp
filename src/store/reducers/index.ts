import { combineReducers } from "@reduxjs/toolkit";
import { exerciseReducer } from "./exerciseReducer";

export const rootReducer = combineReducers({
    exercises: exerciseReducer
})