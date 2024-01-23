import { IStats, StatsFetchAction, StatsFetchActionTypes } from "../types/StatsTypes";

interface StatsState {
    loading: boolean,
    stats: IStats | null,
    error: any
}

const initialState : StatsState = {
    loading: false,
    stats: null,
    error: null
}

export const statsReducer = (state = initialState, action: StatsFetchAction) : StatsState => {
    switch(action.type) {
        case StatsFetchActionTypes.STATS_FETCH_LOADING:
            return {...state, loading: true, error: null}
        case StatsFetchActionTypes.STATS_FETCH_SUCCESS:
            return {...state, loading: false, error: null}
        case StatsFetchActionTypes.STATS_FETCH_ERROR: 
            return {...state, loading: false, error: action.error}
        default:
            return state;
    }
}