import { combineReducers } from "@reduxjs/toolkit";
import { exerciseReducer } from "./exerciseReducer";
import { registerReducer, loginReducer, sessionReducer } from "./authReducer";
import { statsReducer } from "./statsReducer";
import { addExerciseToStatsReducer } from "./addExerciseToStatsReducer";
import { sendEditedStatsDataReducer } from "./exerciseStatsPageSendEditedData";

export const rootReducer = combineReducers({
    exercises: exerciseReducer,
    register: registerReducer,
    login: loginReducer,
    session: sessionReducer,
    stats: statsReducer,
    addExerciseToStats: addExerciseToStatsReducer,
    editedStatsData: sendEditedStatsDataReducer
})