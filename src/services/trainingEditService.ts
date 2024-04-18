import axios from "axios";
import { Dispatch } from "react";
import { SendEditedExerciseStatsAction, SendEditedExerciseStatsTypes, StatsFetchAction, StatsFetchActionTypes } from "../store/types/StatsTypes";
import { TrainingEditActionTypes, TrainingEditAction } from "../store/types/TrainingsTypes";
import { TrainingActionTypes } from "../store/types/TrainingsTypes";
import { AddExerciseToStatsAction, AddExerciseToStatsTypes } from "../store/types/StatsTypes";
import { API_URL } from '.';

interface TrainingCardState {
    added: {[key: string] : String[]}
    removed: {[key: string] : String[]}
}

export const patchTraining = (id: string, data: TrainingCardState) => {
    return async(dispatch: Dispatch<TrainingEditAction>) => {
        try {
            dispatch({type: TrainingEditActionTypes.TRAINING_EDIT_LOADING})
            const response = await axios.patch(`${API_URL}/trainings/${id}`,{data, id}, { withCredentials: true })
            dispatch({
                type: TrainingEditActionTypes.TRAINING_EDIT_SUCCESS,
                message: response.data
            })
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                const e = error.response?.data === undefined ? error :error.response?.data
                dispatch({
                    type: TrainingEditActionTypes.TRAINING_EDIT_ERROR, error: e
                })
            }
        }
    }
}

