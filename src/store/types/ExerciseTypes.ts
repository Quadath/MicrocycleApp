export enum ExerciseFetchActionTypes {
    EXERCISE_FETCH_LOADING = "EXERCISE_FETCH_LOADING",
    EXERCISE_FETCH_SUCCESS = "EXERCISE_FETCH_SUCCESS",
    EXERCISE_FETCH_ERROR = "EXERCISE_FETCH_ERROR"
}

export interface IExercise {
    name: string,
    abbreviation: string,
    description: string
}

interface ExerciseFetchLoadingAction {
    type: ExerciseFetchActionTypes.EXERCISE_FETCH_LOADING
}
interface ExerciseFetchSuccessAction {
    type : ExerciseFetchActionTypes.EXERCISE_FETCH_SUCCESS,
    exercises: {
        [key: string]: IExercise
    }
}
interface ExerciseFetchErrorAction {
    type: ExerciseFetchActionTypes.EXERCISE_FETCH_ERROR,
    error: any
}

export type ExerciseFetchAction = ExerciseFetchLoadingAction | ExerciseFetchSuccessAction | ExerciseFetchErrorAction