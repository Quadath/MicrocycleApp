import { ExerciseFetchAction, ExerciseFetchActionTypes, IExercise } from "../types/ExerciseTypes";
import { TrainingFetchAction, TrainingActionTypes, ITraining } from "../types/TrainingsTypes";

interface TrainingsState {
    loading: boolean,
    trainings: ITraining[] | null,
    error: any
}

const initialState : TrainingsState = {
    loading: false,
    trainings: null,
    error: null
}

export const trainingReducer = (state = initialState, action: TrainingFetchAction) : TrainingsState => {
    switch(action.type) {
        case TrainingActionTypes.TRAINING_FETCH_LOADING:
            return {loading: true, trainings: null, error: null}
        case TrainingActionTypes.TRAINING_FETCH_SUCCESS:
            return {...state, loading: false, trainings: action.trainings, error: null}
        case TrainingActionTypes.TRAINING_FETCH_ERROR: 
            return {...state, loading: false, trainings: null, error: action.error}
        default:
            return state;
    }
}