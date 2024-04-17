import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getTrainings } from '../../services/trainingService'
import TrainingCard from '../../components/training-card/TrainingCard'

import './TrainingPage.sass'
import { Link } from 'react-router-dom'

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
                <h2>
                    <Link className='back-page-button' to={'/user'}><span>&#171;</span></Link>Trainings</h2>
                <button className='training-page-create-button'>new +</button>
            </div>
            <TrainingPageSlider trainings={trainings} exercises={exercises}/>
        </div>
    )
}

function TrainingPageSlider({trainings, exercises}) {
    const [index, setIndex] = useState(0);

    const handleIndexChange = (value) => {
        if (value > trainings.length - 1) return setIndex(0);
        if (value < 0) return setIndex(trainings.length - 1);

        return setIndex(value);
    }

    return (
        <div className="training-page-slider">
            <div className="training-page-slider-buttons">
                <button onClick={() =>handleIndexChange(index-1)}>{`<`}</button>
                {trainings?.map((item, i) => 
                    <div className={`training-page-slider-indicators${index === i ? ' active' : ''}`}></div>
                )}
                <button onClick={() => handleIndexChange(index+1)}>{`>`}</button>
            </div>
            <div className="training-page-slider-content">
                {trainings?.map((item, i) => <TrainingCard training={item} exercises={exercises} active={index === i} indexDelta ={i - index}/>)}
            </div>
            
        </div>
    )
}

