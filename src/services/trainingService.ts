import axios from "axios";
import { Dispatch } from "react";
import { ExerciseFetchAction, ExerciseFetchActionTypes } from "../store/types/ExerciseTypes";
import { TrainingActionTypes, TrainingFetchAction } from "../store/types/TrainingsTypes";
import { API_URL } from '.';


export const getTrainings = () => {
    return async(dispatch: Dispatch<TrainingFetchAction>) => {
        try {
            dispatch({type: TrainingActionTypes.TRAINING_FETCH_LOADING})
            const response = await axios.get(`${API_URL}/trainings`, { withCredentials: true })
            dispatch({
                type: TrainingActionTypes.TRAINING_FETCH_SUCCESS, trainings: response.data
            })
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                const e = error.response?.data === undefined ? error :error.response?.data
                dispatch({
                    type: TrainingActionTypes.TRAINING_FETCH_ERROR, error: e
                })
            }
        }
    }
}