import axios from "axios";
import { Dispatch } from "react";
import { ExerciseFetchAction, ExerciseFetchActionTypes } from "../store/types/ExerciseTypes";

export const getExercisesList = () => {
    return async(dispatch: Dispatch<ExerciseFetchAction>) => {
        try {
            dispatch({type: ExerciseFetchActionTypes.EXERCISE_FETCH_LOADING})
            const response = await axios.get("http://95.31.196.92:3000/exercises")
            dispatch({
                type: ExerciseFetchActionTypes.EXERCISE_FETCH_SUCCESS, exercises: response.data
            })
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                const e = error.response?.data === undefined ? error :error.response?.data
                dispatch({
                    type: ExerciseFetchActionTypes.EXERCISE_FETCH_ERROR, error: e
                })
            }
        }
    }
}