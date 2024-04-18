export enum TrainingActionTypes {
    TRAINING_FETCH_LOADING = "TRAINING_FETCH_LOADING",
    TRAINING_FETCH_SUCCESS = "TRAINING_FETCH_SUCCESS",
    TRAINING_FETCH_ERROR = "TRAINING_FETCH_ERROR"
}

export interface ITraining { 
    name: string,
    author: string,
    days: 
    {
        [key: string]: {
            [index: number]: {
                "exerciseID": string
            }
        }
    },
    id: string
}

interface TrainingFetchLoadingAction {
    type: TrainingActionTypes.TRAINING_FETCH_LOADING
} 
interface TrainingFetchSuccessAction {
    type: TrainingActionTypes.TRAINING_FETCH_SUCCESS,
    trainings: ITraining[]
}
interface TrainingFetchErrorAction {
    type: TrainingActionTypes.TRAINING_FETCH_ERROR,
    error: any
}

export type TrainingFetchAction = TrainingFetchLoadingAction | TrainingFetchSuccessAction | TrainingFetchErrorAction

export enum TrainingEditActionTypes {
    TRAINING_EDIT_LOADING = "TRAINING_EDIT_LOADING",
    TRAINING_EDIT_SUCCESS = "TRAINING_EDIT_SUCCESS",
    TRAINING_EDIT_ERROR = "TRAINING_EDIT_ERROR"
}

interface TrainingEditLoadingAction {
    type: TrainingEditActionTypes.TRAINING_EDIT_LOADING
}
interface TrainingEditSuccessAction {
    type: TrainingEditActionTypes.TRAINING_EDIT_SUCCESS,
    message: string
}
interface TrainingEditErrorAction {
    type: TrainingEditActionTypes.TRAINING_EDIT_ERROR,
    error: any
}

export type TrainingEditAction = TrainingEditLoadingAction | TrainingEditSuccessAction | TrainingEditErrorAction