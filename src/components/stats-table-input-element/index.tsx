export default function StatsTableInputElement({style, text, date, type, setData, data, editingMode}) {

    function handleChange(e) {
        setData({
            ...data,
            [date]: {
                ...data[date],
                [type]: e.target.value
            }
        })
    }

    return (
        <div className={`exercise-stats-table-item ${editingMode ? "editing" : ""}`} style={style}>
            {editingMode && type !== "date"? <input onChange={(e) => handleChange(e)} value={text ? text: ''}/> : <span>{text}</span>}
        </div>
    )
}