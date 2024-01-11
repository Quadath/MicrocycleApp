import React, { useEffect, useState } from 'react';
import { getExercisesList } from './services/exerciseService';
import { useAppDispatch } from './hooks';
import { useTypedSelector } from './hooks/useTypedSelector';

import "./App.sass"

import Header from './components/header/Header';
import RegisterPage from './components/register-page/RegisterForm'

function App() {
  const {exercises, loading, error} = useTypedSelector(state => state.exercises)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getExercisesList())
    console.log(exercises);
  }, [])

  return (
    <div className="app">
      <Header/>
      <RegisterPage/>
      {/* {!loading && exercises == null ? <p>No exercises</p> : <>{exercises?.map(item => <p key={item._id}>{item.name}</p>)}</>}
      {loading && <p>loading...</p>} */}
    </div>
  );
}

export default App;
