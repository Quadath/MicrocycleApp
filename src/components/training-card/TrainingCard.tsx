import { useAppSelector } from '../../hooks';
import './TrainingCard.sass'

export default function TrainingCard(training, exercises, active, indexDelta) {
    const days = Object.keys(training.days);

    if (!exercises) return <></>

    return (
        <div className={`training-card${active ? ' active' : ''}`} 
        style={{transform: `translateX(${100*indexDelta}%)`}}
        key={training._id}>
            <div className="training-card-header">
                <h4>{training.name}</h4>
                <button>edit</button>
            </div>
            <div className="training-card-content">
                {days.map(day => 
                    <div className="training-card-day" key={day}>
                        <h5>{day}</h5>
                        {training.days[day].map((exercise, index) => {
                            return <p key={`${exercise.exerciseID}${day}`}>{index + 1} {exercises[exercise.exerciseID].name }</p>
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}