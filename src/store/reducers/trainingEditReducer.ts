import { TrainingEditAction, TrainingEditActionTypes, ITraining, TrainingActionTypes } from "../types/TrainingsTypes";

interface TrainingEditState {
    loading: boolean,
    message: null | string
    error: any
}

const initialState : TrainingEditState = {
    loading: false,
    message: null,
    error: null
}

export const trainingEditReducer = (state = initialState, action: TrainingEditAction) : TrainingEditState => {
    switch(action.type) {
        case TrainingEditActionTypes.TRAINING_EDIT_LOADING:
            return {loading: true, message: null, error: null}
        case TrainingEditActionTypes.TRAINING_EDIT_SUCCESS:
            return {...state, loading: false, message: action.message, error: null}
        case TrainingEditActionTypes.TRAINING_EDIT_ERROR: 
            return {...state, loading: false, message: null, error: action.error}
        default:
            return state;
    }
}