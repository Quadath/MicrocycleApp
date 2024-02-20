import { SendEditedExerciseStatsTypes, SendEditedExerciseStatsAction } from "../types/StatsTypes";

interface SendEditedStatsDataState {
    loading: boolean,
    error: any
}

const initialState : SendEditedStatsDataState = {
    loading: false,
    error: null
}

export const sendEditedStatsDataReducer = (state = initialState, action : SendEditedExerciseStatsAction) : SendEditedStatsDataState => {
    switch(action.type) {
        case SendEditedExerciseStatsTypes.SEND_EDITED_STATS_DATA_LOADING: 
            return {...state, loading: true, error: null}
        case SendEditedExerciseStatsTypes.SEND_EDITED_STATS_DATA_SUCCESS:
            return {...state, loading: false, error: null}
        case SendEditedExerciseStatsTypes.SEND_EDITED_STATS_DATA_ERROR:
            return {...state, loading: false, error: action.error}
    default: 
        return state
    }
}