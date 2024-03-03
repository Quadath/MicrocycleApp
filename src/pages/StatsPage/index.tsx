import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useAppDispatch } from "../../hooks";
import { loadStats, addExerciseToStats} from "../../services/statsService";


import "./StatsPage.sass"

export default function StatsPage() {
    const dispatch = useAppDispatch()

    const {user, loading: userLoading} = useTypedSelector(state => state.session)
    const {stats} = useTypedSelector(state => state.stats)
    const {exercises} = useTypedSelector(state => state.exercises)
    const {loading: addExerciseLoading} = useTypedSelector(state=> state.addExerciseToStats)

    const navigate = useNavigate()
    
    const [exerciseInputValue, setExerciseInputValue] = useState("");
    const[matchedExercises, setMatchedExercises] = useState<any>([]);

    //Send request to server and clear input
    function handleAddExerciseClick(item) {
        dispatch(addExerciseToStats(item));
        setExerciseInputValue("")
    }

    //Redirect if no user
    useEffect(() => {
        if (!user && !userLoading)  {
            navigate('/auth/login')
        }
    }, [user, userLoading, navigate, stats])

    //Find exercises that matches value of search input
    useEffect(() => {
        setMatchedExercises([]);
        if (!exercises) return;
        if (exerciseInputValue.split(' ').join('') === '') return;
        setMatchedExercises(getKeyByValue(exercises, exerciseInputValue).filter(item => !stats?.exercises[item]))    
    }, [exerciseInputValue])
    
    //Load and update stats
    useEffect(() => {
        dispatch(loadStats())
    }, [addExerciseLoading])
    
    //Get id's of exercises that stats contains
    let exercisesIDs: string[] = stats?.exercises ? Object.keys(stats?.exercises) : []; 
    //Map exerciseIDs to JSX elements
    const exerciseListElements = (function() {
        if (!exercises) return <h3>Loading...</h3>
        if (!stats) return <h3>No stats yet</h3>
        return exercisesIDs.map(item => 
            <div key={item}><Link to={`/stats/${item}`}>{exercises[item].name}</Link></div>
        )
    })()

    //Map matched exercises to list of JSX elements
    const matchedExercisesElements = (function() {
        if(!exercises) return null
        if(!matchedExercises) return null
        return matchedExercises.map(item => 
            <p onClick={() => handleAddExerciseClick(item)} key={item}>{exercises[item].name}</p>)
    })()
    
    return (   
        <div className="stats-page">
            <h2>Stats</h2>
            {exerciseListElements}
            <div className={`stats-addExerciseBlock${matchedExercises.length > 0 ? '' : ' hidden'}`}>
                <input className="stats-addExerciseInput" 
                    onChange={(e) => setExerciseInputValue(e.target.value)}
                    placeholder="Add exercise..."
                    value={exerciseInputValue}
                />
                <div className={`stats-addExerciseList${matchedExercises.length > 0 ? '' : ' hidden'}`}>
                    {matchedExercisesElements}
                </div>
            </div>
        </div>
    )
}

//Search IDs of exercises that matches value of search input
function getKeyByValue(obj, value) {
    return Object.keys(obj)
           .filter(key => obj[key].name.toLowerCase().includes(value.toLowerCase()));
}