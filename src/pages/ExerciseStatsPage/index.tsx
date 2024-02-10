import { Link, useNavigate, useParams } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useAppDispatch } from "../../hooks"
import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

import "./ExerciseStatsPage.sass"
import { loadStats } from "../../services/statsService"
import {Grid} from 'react-virtualized';


export default function ExerciseStatsPage() {
    const dispatch = useAppDispatch()

    const {user, loading: userLoading} = useTypedSelector(state => state.session)
    const {stats, loading: statsLoading} = useTypedSelector(state => state.stats)
    const {exercises} = useTypedSelector(state => state.exercises)

    const [tableWidth, setTableWidth] = useState(window.innerWidth > 520 ? 500 : window.innerWidth < 280 ? 300 : window.innerWidth - 20)

    const navigate = useNavigate()
    const params = useParams()

    const currentDateRef = useRef<null | HTMLElement>(null)

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

    useEffect(() => {
        window.addEventListener("resize", () => {
            setTableWidth(window.innerWidth > 520 ? 500 : window.innerWidth < 280 ? 300 : window.innerWidth - 20)
        }, false)
    }, [])
  
    useEffect(() => {
        if (!statsLoading) {
            if (currentDateRef) {
                // currentDateRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'})
            }
        }
    }, [statsLoading])

    const dataTable = DataTable(stats, params.exerciseID, currentDateRef);

    return (
        <div className="exercise-stats-page">
            <h2 className="header">
                <Link to={'/stats'}><span>&#171;</span></Link>
                {exercises && exercises[`${params.exerciseID}`].name}
            </h2>
            <div className="exercise-stats-table-block">
                    <div className="exercise-stats-table-info">
                        <span>Date</span>
                        <span>Weight</span>
                        <span>Sets</span>
                        <span>Repeats</span>
                    </div>
                <div className="exercise-stats-table-wrapper">
                <Grid
                    cellRenderer={props => <RowRenderer stats={stats} exerciseID={params.exerciseID} {...props}/>}
                    columnCount={4}
                    columnWidth={tableWidth/4}
                    height={300}
                    rowCount={getArrayOfDates().length}
                    rowHeight={40}
                    width={tableWidth}
                />
                </div>
            </div>
        </div>
    )
}


const RowRenderer = props => {
    const {stats, exerciseID, rowIndex, columnIndex, style} = props;

    if (!stats) return <span>Error: no stats</span>
    if (!exerciseID) return <span>Error: invalid exerciseID</span>
    if (!stats.exercises[exerciseID]) return <span>Error: no data about this exercise</span>

    const objKeys = ['weight', 'sets', 'repeats']
    let element;



    
    const dates = getArrayOfDates()
    const exerciseInfoItems = dates.map(item => stats.exercises[exerciseID][item] ? stats.exercises[exerciseID][item] : null) 

    switch(columnIndex) {
        case 0: 
            element = <div className="exercise-stats-table-item" style={style}>{dates[rowIndex].slice(-5)}</div>
            break;
        case 1: 
            element = <div className="exercise-stats-table-item" style={style}>{exerciseInfoItems[rowIndex]?.weight}</div>
            break;
        case 2:
            element = <div className="exercise-stats-table-item" style={style}>{exerciseInfoItems[rowIndex]?.sets}</div>
            break;
        case 3:
            element = <div className="exercise-stats-table-item" style={style}>{exerciseInfoItems[rowIndex]?.repeats}</div>
            break;
        default: 
            element = <div style={style}></div>
    }

    return (
       <>
       {element}
       </>
    )
}

// function CellRenderer({columnIndex, key, rowIndex, style}) {
//     let {otherprops} = this.props;
//     return (
//       <div key={key} style={style}>
//         {list[rowIndex][columnIndex]}
//       </div>
//     );
// }
  

function DataTable(stats, exerciseID, ref) {
    if (!stats) return <span>Error: no stats</span>
    if (!exerciseID) return <span>Error: invalid exerciseID</span>
    if (!stats.exercises[exerciseID]) return <span>Error: no data about this exercise</span>

    const dates = getArrayOfDates()
    const exerciseInfoItems = dates.map(item => stats.exercises[exerciseID][item] ? stats.exercises[exerciseID][item] : null) 

    return (
        <table cellSpacing={0}>
            <tbody className="exercise-stats-table">
                <tr>
                    {dates.map(item => <td key={uuidv4()} ref={item === toDateKey(new Date()) ? ref : null}>{item.slice(-5)}</td>)}
                </tr>
                <tr>
                    {exerciseInfoItems.map(item => <td key={uuidv4()}><span>{item ? item.weight : ""}</span></td>)}
                </tr>
                <tr>
                    {exerciseInfoItems.map(item => <td key={uuidv4()}><span>{item ? item.sets : ""}</span></td>)}
                </tr>
                <tr>
                    {exerciseInfoItems.map(item => <td key={uuidv4()}><span>{item ? item.repeats : ""}</span></td>)}
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

function toDateKey(date) {
    return date.toISOString().split('T')[0].replaceAll("-", "_");
}

