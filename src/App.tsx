import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getExercisesList } from './services/exerciseService';
import { useAppDispatch } from './hooks';
import { useTypedSelector } from './hooks/useTypedSelector';

import "./App.sass"

import Header from './components/header/Header';
import RegisterForm from './components/register-form/RegisterForm';

function App() {
  const {exercises, loading, error} = useTypedSelector(state => state.exercises)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getExercisesList())
    console.log(exercises);
  }, [])

  return (
    
    <BrowserRouter basename="/app">

      <Routes>
        <Route path='*' element={
          <div className="app">
          <Header/>
          <Routes>
            <Route path='/auth/register' element={<RegisterForm/>}/>
          </Routes>
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
