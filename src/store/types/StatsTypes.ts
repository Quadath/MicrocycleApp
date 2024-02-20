export interface IStats {
    exercises: {
        [key: string]: {
            [key: string]: {
                weight: Number
                sets: Number
                repeats: Number
            }
        }
    }
}

export enum StatsFetchActionTypes {
    STATS_FETCH_LOADING = "STATS_FETCH_LOADING",
    STATS_FETCH_SUCCESS = "STATS_FETCH_SUCCESS",
    STATS_FETCH_ERROR = "STATS_FETCH_ERROR"
}

interface StatsFetchLoadingAction {
    type: StatsFetchActionTypes.STATS_FETCH_LOADING
}
interface StatsFetchSuccessAction {
    type: StatsFetchActionTypes.STATS_FETCH_SUCCESS,
    stats: IStats
}
interface StatsFetchErrorAction {
    type: StatsFetchActionTypes.STATS_FETCH_ERROR,
    error: any
}

export type StatsFetchAction = StatsFetchLoadingAction | StatsFetchSuccessAction | StatsFetchErrorAction


export enum AddExerciseToStatsTypes {
    ADD_EXERCISE_TO_STATS_LOADING = "ADD_EXERCISE_TO_STATS_LOADING",
    ADD_EXERCISE_TO_STATS_SUCCESS = "ADD_EXERCISE_TO_STATS_SUCCESS",
    ADD_EXERCISE_TO_STATS_ERROR = "ADD_EXERCISE_TO_STATS_ERROR"
}

interface AddExerciseToStatsLoadingAction {
    type: AddExerciseToStatsTypes.ADD_EXERCISE_TO_STATS_LOADING,
    id: string
}
interface AddExerciseToStatsSuccessAction {
    type: AddExerciseToStatsTypes.ADD_EXERCISE_TO_STATS_SUCCESS,
    message: string
}
interface AddExerciseToStatsErrorAction {
    type: AddExerciseToStatsTypes.ADD_EXERCISE_TO_STATS_ERROR,
    error: any
}

export type AddExerciseToStatsAction = AddExerciseToStatsLoadingAction | AddExerciseToStatsSuccessAction | AddExerciseToStatsErrorAction


export enum SendEditedExerciseStatsTypes {
    SEND_EDITED_STATS_DATA_LOADING = "SEND_EDITED_EXERCISE_STATS_LOADING",
    SEND_EDITED_STATS_DATA_SUCCESS = "SEND_EDITED_EXERCISE_STATS_SUCCESS",
    SEND_EDITED_STATS_DATA_ERROR = "SEND_EDITED_EXERCISE_STATS_ERROR"
}

interface SendEditedDataLoadingAction {
    type: SendEditedExerciseStatsTypes.SEND_EDITED_STATS_DATA_LOADING
}
interface SendEditedDataSuccessAction {
    type: SendEditedExerciseStatsTypes.SEND_EDITED_STATS_DATA_SUCCESS,
}
interface SendEditedDataErrorAction {
    type: SendEditedExerciseStatsTypes.SEND_EDITED_STATS_DATA_ERROR,
    error: any
}

export type SendEditedExerciseStatsAction = SendEditedDataLoadingAction | SendEditedDataSuccessAction | SendEditedDataErrorAction
