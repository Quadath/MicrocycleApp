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