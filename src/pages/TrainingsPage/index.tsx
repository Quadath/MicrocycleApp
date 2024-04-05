import { useEffect } from 'react'
import './TrainingsPage.sass'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getTrainings } from '../../services/trainingService'
import TrainingCard from '../../components/training-card/TrainingCard'

export default function TrainingsPage() {

    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.session)
    const {trainings} = useAppSelector(state => state.trainings)
    const {exercises, loading: exLoading} = useAppSelector(state => state.exercises)

    useEffect(() => {
        dispatch(getTrainings())
    }, [user])

    useEffect(() => {
    }, [trainings, exLoading])

    return (
        <div className="trainings-page">
            <h2 className='trainings-page-header'>Trainings</h2>
            {!exLoading ? trainings?.map(item => TrainingCard(item, exercises)) : <></>}
        </div>
    )
}

