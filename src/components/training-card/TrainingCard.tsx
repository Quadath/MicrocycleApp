import './TrainingCard.sass'

export default function TrainingCard(training, exercises) {
    const days = Object.keys(training.days);
    return (
        <div className='training-card' key={training._id}>
            <div className="training-card-header">
                <h4>{training.name}</h4>
            </div>
            <div className="training-card-content">
                {days.map(day => 
                    <div className="training-card-day" key={day}>
                        <h5>{day}</h5>
                        {training.days[day].map((exercise, index) => {
                            return <p key={`${exercise.exerciseID}${day}`}>{exercises[exercise.exerciseID].name}</p>
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}