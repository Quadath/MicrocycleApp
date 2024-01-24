import { useEffect } from "react";
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
    const params = useParams()
    const exerciseId = params['*']
    useEffect(() => {
        if (!user && !userLoading)  {
            navigate('/auth/login')
        }
    }, [user, userLoading, navigate, stats])
    let ex
    if (stats?.exercises) {
        ex = Object.keys(stats?.exercises);
    }

    useEffect(() => {
        dispatch(loadStats())
    }, [])

    if(stats && exerciseId) {
    }
    return (   
        <div className="stats-page">
            <h2>Stats</h2>
            {!stats && <h3>No stats yet</h3> }
            {ex && exercises && ex.map(item => 
                <div key={item}><Link to={`/stats/${item}`}>{exercises[item]}</Link></div>
            )}
        </div>
    )
}
