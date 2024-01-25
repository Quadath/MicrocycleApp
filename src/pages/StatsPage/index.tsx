import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useAppDispatch } from "../../hooks";
import { loadStats } from "../../services/statsService";

import "./StatsPage.sass"

export default function StatsPage() {

    const dispatch = useAppDispatch()

    const {user, loading: userLoading} = useTypedSelector(state => state.session)
    const {stats} = useTypedSelector(state => state.stats)
    const {exercises} = useTypedSelector(state => state.exercises)

    const navigate = useNavigate()
    
    const [exerciseInputValue, setExerciseInputValue] = useState("");
    const [inputAddVisible, setInputAddVisible] = useState(false);

    useEffect(() => {
        if (!user && !userLoading)  {
            navigate('/auth/login')
        }
    }, [user, userLoading, navigate, stats])
    let exercisesIDs: string[] = []
    if (stats?.exercises) {
        Object.keys(stats?.exercises).forEach(item => exercisesIDs.push(item))
    }
    const[matchedExercises, setMatchedExercises] = useState<any>([]);

    useEffect(() => {
        if (exercises && exerciseInputValue !== "" && exerciseInputValue.split(' ').join('') !== '') {
            setMatchedExercises(getKeyByValue(exercises, exerciseInputValue).map(item => exercises[item]))
        } else {
            setMatchedExercises([]);
        }
    }, [exerciseInputValue])
    
    useEffect(() => {
        dispatch(loadStats())
    }, [])

    return (   
        <div className="stats-page">
            <h2>Stats</h2>
            {!stats && <h3>No stats yet</h3> }
            {exercisesIDs && exercises && exercisesIDs.map(item => 
                <div key={item}><Link to={`/stats/${item}`}>{exercises[item].name}</Link></div>
            )}
            <button className="stats-addExerciseButton" onClick={() => setInputAddVisible(!inputAddVisible)}>
                Add <span>+</span>
            </button>
            <div className={`stats-addExerciseBlock${inputAddVisible ? '' : ' hidden'}`}>
                <input className="stats-addExerciseInput" placeholder="Type name here..." onChange={(e) => setExerciseInputValue(e.target.value.toLowerCase())}/>
                <div className={`stats-addExerciseDropdown${matchedExercises.length !== 0 ? '' : ' hidden'}`}>
                    {exercises && matchedExercises?.map(item => 
                        <p key={item.name}>{item.name}</p>)}
                </div>
            </div>
        </div>
    )
}

function getKeyByValue(obj, value) {
    return Object.keys(obj)
           .filter(key => obj[key].name.toLowerCase().includes(value));
}