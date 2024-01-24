import { useNavigate, useParams } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useAppDispatch } from "../../hooks"
import { useEffect } from "react"

import "./ExerciseStatsPage.sass"

export default function ExerciseStatsPage() {
    const dispatch = useAppDispatch()

    const {user, loading: userLoading} = useTypedSelector(state => state.session)
    const {stats} = useTypedSelector(state => state.stats)
    const {exercises} = useTypedSelector(state => state.exercises)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (!user && !userLoading)  {
            navigate('/auth/login')
        }
    }, [user, userLoading, navigate, stats])


    return (
        <div className="exercise_stats-page">
            <h2 className="header">{exercises && exercises[`${params.exerciseId}`]}</h2>
            {stats?.exercises && params.exerciseId && Object.keys(stats.exercises[params.exerciseId]).map(item => 
                <div key={item}>
                    <h4>{item}</h4>
                    <p>{`Weight: ${stats.exercises[`${params.exerciseId}`][item].weight}`}</p>
                    <p>{`Sets: ${stats.exercises[`${params.exerciseId}`][item].sets}`}</p>
                    <p>{`Repeats: ${stats.exercises[`${params.exerciseId}`][item].repeats}`}</p>
                </div>
            )}
        </div>
    )
}