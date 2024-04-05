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