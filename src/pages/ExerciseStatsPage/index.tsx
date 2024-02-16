import { Link, useNavigate, useParams } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useAppDispatch } from "../../hooks"
import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

import "./ExerciseStatsPage.sass"

import { loadStats } from "../../services/statsService"
import {Grid} from 'react-virtualized';
import StatsTableInputElement from "../../components/stats-table-input-element";

export default function ExerciseStatsPage() {
    const dispatch = useAppDispatch()

    const {user, loading: userLoading} = useTypedSelector(state => state.session)
    const {stats, loading: statsLoading} = useTypedSelector(state => state.stats)
    const {exercises} = useTypedSelector(state => state.exercises)

    const [editingMode, setEditingMode] = useState(false);
    const [editedData, setEditedData]= useState({})

    const [tableWidth, setTableWidth] = useState(window.innerWidth >= 520 ? 500 : window.innerWidth <= 280 ? 300 : window.innerWidth - 20)

    const navigate = useNavigate()
    const params = useParams()

    const gridRef = useRef<Grid>();
    const todayRow = 1 + getArrayOfDates().findIndex((item) => item === toDateKey(new Date()))


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

    //Align table width when window resizes
    useEffect(() => {
        window.addEventListener("resize", () => {
            setTableWidth(window.innerWidth >= 520 ? 500 : window.innerWidth <= 280 ? 300 : window.innerWidth - 20)
        }, false)
    }, [])
  

    useEffect(() => {
        if (!statsLoading) {
            gridRef.current?.scrollToCell({columnIndex: 0, rowIndex: todayRow})
        }
    }, [statsLoading])

    return (
        <div className="exercise-stats-page">
            <h2 className="header">
                <Link to={'/stats'}><span>&#171;</span></Link>
                {exercises && exercises[`${params.exerciseID}`].name}
            </h2>
            <div style={{width: `${tableWidth}px`}} className="exercise-stats-table-actions-block">
                <button className="exercise-stats-table-actions-button" onClick={() => gridRef.current?.scrollToCell({columnIndex: 0, rowIndex: todayRow})}>Now ⏲</button>
                <button className="exercise-stats-table-actions-button" onClick={() => setEditingMode(!editingMode)}>Edit ✎</button>
            </div>
            <div className="exercise-stats-table-block">
                    <div className="exercise-stats-table-info">
                        <span>Date</span>
                        <span>Weight</span>
                        <span>Sets</span>
                        <span>Repeats</span>
                    </div>
                <div className="exercise-stats-table-wrapper">
                <Grid
                    cellRenderer={props => 
                    <RowRenderer editingMode={editingMode} stats={stats} data={editedData} setEditedData={setEditedData} 
                    exerciseID={params.exerciseID} {...props}/>
                }
                    columnCount={4}
                    columnWidth={tableWidth/4}
                    height={300}
                    rowCount={getArrayOfDates().length}
                    rowHeight={40}
                    width={tableWidth}
                    ref={gridRef}
                />
                </div>
            </div>
        </div>
    )
}


const RowRenderer = props => {
    const {stats, exerciseID, rowIndex, columnIndex, style, editingMode, data, setEditedData} = props;

    if (!stats) return <span>Error: no stats</span>
    if (!exerciseID) return <span>Error: invalid exerciseID</span>
    if (!stats.exercises[exerciseID]) return <span>Error: no data about this exercise</span>

    let element;

    const dates = getArrayOfDates()
    const exerciseInfoItems = dates.map(item => stats.exercises[exerciseID][item] ? stats.exercises[exerciseID][item] : null) 


    switch(columnIndex) {
        case 0: 
            element = <StatsTableInputElement type="date" date={dates[rowIndex]} editingMode={editingMode} 
            data={data} setData={setEditedData} style={style} text={dates[rowIndex].slice(-5)}/>
            break;
        case 1: 
            element = <StatsTableInputElement type="weight" date={dates[rowIndex]} editingMode={editingMode} 
            data={data} setData={setEditedData} style={style} text={data[dates[rowIndex]]?.weight ? data[dates[rowIndex]].weight : exerciseInfoItems[rowIndex]?.weight}/>
            break;
        case 2:
            element = <StatsTableInputElement type="sets" date={dates[rowIndex]} editingMode={editingMode} 
            data={data} setData={setEditedData} style={style} text={data[dates[rowIndex]]?.sets ? data[dates[rowIndex]].sets : exerciseInfoItems[rowIndex]?.sets}></StatsTableInputElement>
            break;
        case 3:
            element = <StatsTableInputElement type="repeats" date={dates[rowIndex]} editingMode={editingMode} 
            data={data} setData={setEditedData} style={style} text={data[dates[rowIndex]]?.repeats ? data[dates[rowIndex]].repeats : exerciseInfoItems[rowIndex]?.repeats}></StatsTableInputElement>
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
