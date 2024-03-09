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

    return (
        <div className="trainings-page">
            <h2>Trainings</h2>
        </div>
    )
}