import { useState } from 'react';
import './TrainingCard.sass'
import { useAppDispatch } from '../../hooks';
import { patchTraining } from '../../services/trainingEditService';

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export default function TrainingCard({training, exercises, active, indexDelta}) {
    const [editingMode, setEditingMode] = useState(false)
    const [editedData, setEditedData] = useState<TrainingCardState>({
        added: {},
        removed: {}
    })

    const dispatch = useAppDispatch()

    function handleEdit() {
        if (editingMode) {
            dispatch(patchTraining(training._id, editedData))
        }
        setEditingMode(!editingMode)
    }
    if(!training || !exercises) return <></>

    return (
        <div className={`training-card${active ? ' active' : ''}${editingMode? ' editing': ''}`} 
        style={{transform: `translateX(${100*indexDelta}%)`}}
        key={training._id}>
            <div className="training-card-header">
                <h4>{training.name}</h4>
                <button className={`training-card-edit${editingMode ? ' editing' : ''}`} onClick={() => handleEdit()}>EDIT</button>
            </div>
            <div className="training-card-content">
                {!editingMode && weekDays.map(day => training.days[day].length > 0 && <TrainingCardDayItem exercises={exercises} training={training} 
                editingMode={editingMode} day={day} editedData={editedData} setEditedData={setEditedData}/>)}
                {editingMode && weekDays.map(day => <TrainingCardDayItem  exercises={exercises} training={training} 
                editingMode={editingMode} day={day} editedData={editedData} setEditedData={setEditedData}/>)}
            </div>
        </div>
    )
}

function TrainingCardDayItem({exercises, training, day, editingMode, editedData, setEditedData}) {
    const [isInputActive, setInputActive] = useState(false);
    const [inputValue, setInputValue] = useState('')

    const handleAddExercise = (id) => {

        setEditedData({...editedData, added: {...editedData.added, [day]: 
            [...(editedData.added[day] ? editedData.added[day] : []) , id]}})

        setInputActive(false)
        setInputValue('')
    }

    return (
        <div className="training-card-day">
            <h5>
                {day}
                {editingMode && <button onClick={() => setInputActive(!isInputActive)} className='training-card-add-exercise-button'>+</button>}
            </h5>
            {training.days[day]?.map((exercise, index) => {
                if (editedData.removed[day] && editedData.removed[day].includes(exercise)) 
                { index--; return<></> }
                return <p key={`${exercise.exerciseID}${day}`}>{index + 1} {exercises[exercise.exerciseID].name }
                    {editingMode && <button className='training-card-remove-exercise-button'
                    onClick={() => setEditedData({...editedData, removed: {...editedData.removed, [day]: [exercise]}})}
                    >x</button>}
                </p>
            })}
            {editedData.added[day]?.map((item, index) => {
                return <p>{(training.days[day]?.length ? training.days[day].length : 0)  + (index + 1)} {exercises[item].name}</p>
            })}
            {editingMode && isInputActive && <>
                <input className='training-card-input' placeholder='Exercise name...' value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}/>
                {inputValue.length >= 2 && <TrainingCardInputDropdown exercises={exercises} value={inputValue} 
                handleAddExercise={handleAddExercise}/>}
                </>
            }
        </div>
    )
}

function TrainingCardInputDropdown({exercises, value, handleAddExercise}) {
    const matchedExercises = Object.keys(exercises).filter(key => exercises[key].name.toLowerCase().includes(value.toLowerCase()))
    return (
        <div className="training-card-input-dropdown">
            {matchedExercises.map(ex => <p onClick={() => handleAddExercise(ex)}>{exercises[ex].name}</p>)}
        </div>
    )
}

interface TrainingCardState {
    added: {[key: string] : String[]}
    removed: {[key: string] : String[]}
}