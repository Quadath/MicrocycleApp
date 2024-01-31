import { useNavigate, useParams } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useAppDispatch } from "../../hooks"
import { useEffect } from "react"

import "./ExerciseStatsPage.sass"
import { loadStats } from "../../services/statsService"

export default function ExerciseStatsPage() {
    const dispatch = useAppDispatch()

    const {user, loading: userLoading} = useTypedSelector(state => state.session)
    const {stats} = useTypedSelector(state => state.stats)
    const {exercises} = useTypedSelector(state => state.exercises)

    const navigate = useNavigate()
    const params = useParams()

    //Redirect if no user
    useEffect(() => {
        if (!user && !userLoading)  {
            navigate('/auth/login')
        }
    }, [user, userLoading, navigate, stats])

    //Update stats 
    useEffect(() => {
        dispatch(loadStats())
    }, [])

    const dataTable = DataTable(stats, params.exerciseID);

    return (
        <div className="exercise_stats-page">
            <h2 className="header">{exercises && exercises[`${params.exerciseID}`].name}</h2>
            <div className="exercise_stats-table">
                {dataTable}
            </div>
        </div>
    )
}

function DataTable(stats, exerciseID) {
    if (!stats) return <span>Error: no stats</span>
    if (!exerciseID) return <span>Error: invalid exerciseID</span>
    if (!stats.exercises[exerciseID]) return <span>Error: no data about this exercise</span>
    const arrayOfDates = getArrayOfDates();

    return (
        <table>
            <tbody>
                <tr>
                    {arrayOfDates.map(item => <th key={`${item}d`}>{item.slice(-5)}</th>)}
                </tr>
                <tr>
                    {arrayOfDates.map(item => <td key={`${item}w`}>{stats.exercises[exerciseID][item]?.weight}</td>)}
                </tr>
                <tr>
                    {arrayOfDates.map(item => <td key={`${item}s`}>{stats.exercises[exerciseID][item]?.sets}</td>)}
                </tr>
                <tr>
                    {arrayOfDates.map(item => <td key={`${item}r`}>{stats.exercises[exerciseID][item]?.repeats}</td>)}
                </tr>
            </tbody>
        </table>
    )
}

function getArrayOfDates() {
    const year = new Date().getFullYear()

    let date = new Date(year, 0);
    const result: string[] = []
    while(date.getFullYear() !== (year + 1)) {
        date = new Date(date.getTime() + 86400 * 1000)
        result.push(date.toISOString().split('T')[0].replaceAll("-", "_"))
    }

    return result
}