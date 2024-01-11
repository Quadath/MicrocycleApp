import React, { useEffect } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { getExercisesList } from './services/exerciseService';
import { useAppDispatch } from './hooks';
import { useTypedSelector } from './hooks/useTypedSelector';

import "./App.sass"

import Header from './components/header/Header';
import RegisterForm from './components/register-page/RegisterForm';

function App() {
  const {exercises, loading, error} = useTypedSelector(state => state.exercises)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getExercisesList())
    console.log(exercises);
  }, [])

  return (
    
    <BrowserRouter basename="/app">
      <div className="app">
        <Header/>
        <Routes>
          <Route path='/auth/register' element={<RegisterForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
