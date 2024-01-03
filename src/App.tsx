import React, { useEffect, useState } from 'react';
import { getExercisesList } from './services/exerciseService';
import { useAppDispatch } from './hooks';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
  const {exercises, loading, error} = useTypedSelector(state => state.exercises)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getExercisesList())
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
