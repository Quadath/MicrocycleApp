import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getTrainings } from '../../services/trainingService'
import TrainingCard from '../../components/training-card/TrainingCard'

import './TrainingPage.sass'

export default function TrainingPage() {

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
        <div className="training-page">
            <div className="training-page-header">
                <h2>Trainings</h2>
                <button className='training-page-create-button'>new +</button>
            </div>
            {exercises ? <TrainingPageSlider trainings={trainings} exercises={exercises}/> : <></>}
        </div>
    )
}

function TrainingPageSlider({trainings, exercises}) {
    const [index, setIndex] = useState(0);
    if (!trainings || !exercises) return <></>

    const handleIndexChange = (value) => {
        if (value > trainings.length - 1) return setIndex(0);
        if (value < 0) return setIndex(trainings.length - 1);

        return setIndex(value);
    }

    return (
        <div className="training-page-slider">
            <div className="training-page-slider-buttons">
                <button onClick={() =>handleIndexChange(index-1)}>-</button>
                <button onClick={() => handleIndexChange(index+1)}>+</button>
            </div>
            <div className="training-page-slider-content">
                {trainings?.map((item, i) => TrainingCard(item, exercises, index === i, i - index))}
            </div>
            
        </div>
    )
}

