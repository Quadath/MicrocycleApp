import { AddExerciseToStatsTypes, AddExerciseToStatsAction } from "../types/StatsTypes";

interface AddExerciseToStatsState {
    id: String | null,
    loading: boolean,
    message: string | null,
    error: any
}

const initialState : AddExerciseToStatsState = {
    id: null,
    loading: false,
    message: null,
    error: null
}

export const addExerciseToStatsReducer = (state = initialState, action :AddExerciseToStatsAction) : AddExerciseToStatsState => {
    switch(action.type) {
        case AddExerciseToStatsTypes.ADD_EXERCISE_TO_STATS_LOADING: 
            return {...state, id: action.id, loading: true}
        case AddExerciseToStatsTypes.ADD_EXERCISE_TO_STATS_SUCCESS:
            return {...state, loading: false, message: action.message, error: null}
        case AddExerciseToStatsTypes.ADD_EXERCISE_TO_STATS_ERROR:
            return {...state, loading: false, error: action.error}
    default: 
        return state
    }
}