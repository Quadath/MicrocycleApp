import { useState } from 'react';
import './TrainingCard.sass'

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export default function TrainingCard({training, exercises, active, indexDelta}) {
    const [editingMode, setEditingMode] = useState(false)
    const [editedData, setEditedData] = useState<TrainingCardState>({
        added: {},
        removed: {}
    })


    if(!training || !exercises) return <></>
    const days = Object.keys(training.days);

    return (
        <div className={`training-card${active ? ' active' : ''}${editingMode? ' editing': ''}`} 
        style={{transform: `translateX(${100*indexDelta}%)`}}
        key={training._id}>
            <div className="training-card-header">
                <h4>{training.name}</h4>
                <button className="training-card-edit" onClick={() => setEditingMode(!editingMode)}>EDIT</button>
            </div>
            <div className="training-card-content">
                {!editingMode && days.map(day => <TrainingCardDayItem  exercises={exercises} training={training} 
                editingMode={editingMode} day={day}/>)}
                {editingMode && weekDays.map(day => <TrainingCardDayItem  exercises={exercises} training={training} 
                editingMode={editingMode} day={day}/>)}
            </div>
        </div>
    )
}

function TrainingCardDayItem({exercises, training, day, editingMode}) {
    const [isInputActive, setInputActive] = useState(false);

    return (
        <div className="training-card-day">
            <h5>
                {day}
                {editingMode && <button onClick={() => setInputActive(!isInputActive)} className='training-card-add-exercise-button'>+</button>}
            </h5>
            {training.days[day]?.map((exercise, index) => {
                return <p key={`${exercise.exerciseID}${day}`}>{index + 1} {exercises[exercise.exerciseID].name }</p>
            })}
        </div>
    )
}

interface TrainingCardState {
    added: {[key: string] : String[]}
    removed: {[key: string] : String[]}
}