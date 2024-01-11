import React, { useEffect, useState } from 'react';
import { getExercisesList } from './services/exerciseService';
import { useAppDispatch } from './hooks';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
  const {exercises, loading, error} = useTypedSelector(state => state.exercises)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getExercisesList())
    console.log(exercises);
  }, [])

  return (
    <div className="App">
      {!loading && exercises == null ? <p>No exercises</p> : <>{exercises?.map(item => <p key={item._id}>{item.name}</p>)}</>}
      {loading && <p>loading...</p>}
    </div>
  );
}

export default App;
