export interface IExercise {
    _id: string,
    name: string
}

export enum ExerciseFetchActionTypes {
    EXERCISE_FETCH_LOADING = "EXERCISE_FETCH_LOADING",
    EXERCISE_FETCH_SUCCESS = "EXERCISE_FETCH_SUCCESS",
    EXERCISE_FETCH_ERROR = "EXERCISE_FETCH_ERROR"
}

interface ExerciseFetchLoadingAction {
    type: ExerciseFetchActionTypes.EXERCISE_FETCH_LOADING
}
interface ExerciseFetchSuccessAction {
    type : ExerciseFetchActionTypes.EXERCISE_FETCH_SUCCESS,
    exercises: IExercise[]
}
interface ExerciseFetchErrorAction {
    type: ExerciseFetchActionTypes.EXERCISE_FETCH_ERROR,
    error: any
}

export type ExerciseFetchAction = ExerciseFetchLoadingAction | ExerciseFetchSuccessAction | ExerciseFetchErrorAction