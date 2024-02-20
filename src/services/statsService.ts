import axios from "axios";
import { Dispatch } from "react";
import { SendEditedExerciseStatsAction, SendEditedExerciseStatsTypes, StatsFetchAction, StatsFetchActionTypes } from "../store/types/StatsTypes";
import { AddExerciseToStatsAction, AddExerciseToStatsTypes } from "../store/types/StatsTypes";
import { API_URL } from '.';



export const loadStats = () => {
    return async(dispatch: Dispatch<StatsFetchAction>) => {
        try {
            dispatch({type: StatsFetchActionTypes.STATS_FETCH_LOADING})
            const response = await axios.get(`${API_URL}/users/stats`, {withCredentials: true})
            dispatch({
                type: StatsFetchActionTypes.STATS_FETCH_SUCCESS, stats: response.data
            })
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                const e = error.response?.data === undefined ? error :error.response?.data
                dispatch({
                    type: StatsFetchActionTypes.STATS_FETCH_ERROR, error: e
                })
            }
        }
    }
}

export const addExerciseToStats = (id: string) => {
    return async(dispatch: Dispatch<AddExerciseToStatsAction>) => {
        try {
            dispatch({type: AddExerciseToStatsTypes.ADD_EXERCISE_TO_STATS_LOADING, id})
            const response = await axios.post(`${API_URL}/users/stats/exercises/${id}`,{}, { withCredentials: true })
            dispatch({
                type: AddExerciseToStatsTypes.ADD_EXERCISE_TO_STATS_SUCCESS, message: response.data
            })
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                const e = error.response?.data === undefined ? error :error.response?.data
                dispatch({
                    type: AddExerciseToStatsTypes.ADD_EXERCISE_TO_STATS_ERROR, error: e
                })
            }
        }
    }
}

interface exerciseStatsData { 
    [key: string]: {
        weight: number,
        sets: number,
        repeats: number
    }
}

export const sendEditedStatsData = (id: string, data: exerciseStatsData) => {
    return async(dispatch: Dispatch<SendEditedExerciseStatsAction>) => {
        try {
            dispatch({type: SendEditedExerciseStatsTypes.SEND_EDITED_STATS_DATA_LOADING})
            const response = await axios.post(`${API_URL}/users/stats/exercises/${id}`,{data}, { withCredentials: true })
            dispatch({
                type: SendEditedExerciseStatsTypes.SEND_EDITED_STATS_DATA_SUCCESS
            })
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                const e = error.response?.data === undefined ? error :error.response?.data
                dispatch({
                    type: SendEditedExerciseStatsTypes.SEND_EDITED_STATS_DATA_ERROR, error: e
                })
            }
        }
    }
}