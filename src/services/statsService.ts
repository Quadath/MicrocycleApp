import axios from "axios";
import { Dispatch } from "react";
import { StatsFetchAction, StatsFetchActionTypes } from "../store/types/StatsTypes";
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