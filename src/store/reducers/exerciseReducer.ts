import { ExerciseFetchAction, ExerciseFetchActionTypes, IExercise } from "../types/ExerciseTypes";

interface ExerciseState {
    loading: boolean,
    exercises: {[key: string]: IExercise} | null,
    error: any
}

const initialState : ExerciseState = {
    loading: false,
    exercises: null,
    error: null
}

export const exerciseReducer = (state = initialState, action: ExerciseFetchAction) : ExerciseState => {
    switch(action.type) {
        case ExerciseFetchActionTypes.EXERCISE_FETCH_LOADING:
            return {loading: true, exercises: null, error: null}
        case ExerciseFetchActionTypes.EXERCISE_FETCH_SUCCESS:
            return {...state, loading: false, exercises: action.exercises, error: null}
        case ExerciseFetchActionTypes.EXERCISE_FETCH_ERROR: 
            return {...state, loading: false, exercises: null, error: action.error}
        default:
            return state;
    }
}