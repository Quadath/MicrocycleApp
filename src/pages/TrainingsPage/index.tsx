import { useEffect } from 'react'
import './TrainingsPage.sass'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getTrainings } from '../../services/trainingService'

export default function TrainingsPage() {

    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.session)
    const {trainings} = useAppSelector(state => state.trainings)

    useEffect(() => {
        dispatch(getTrainings())
    }, [user])

    useEffect(() => {
    }, [trainings])

    return (
        <div className="trainings-page">
            <h2>Trainings</h2>
            {trainings?.map(item => TrainingItem(item))}
        </div>
    )
}

function TrainingItem(training) {
    return (
        <div key={training._id}>
            <h4>{training.name}</h4>
            {training.da}
        </div>
    )
}