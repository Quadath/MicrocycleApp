import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch } from './hooks';
import { useTypedSelector } from './hooks/useTypedSelector';
import { getCurrentUser } from './services/authService';
import { getExercisesList } from './services/exerciseService';

import "./App.sass"


import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

import Header from './components/header/Header';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import StatsPage from './pages/StatsPage';
import ExerciseStatsPage from './pages/ExerciseStatsPage';


function App() {

  const {message: loginMessage} = useTypedSelector(state => state.login)

  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [loginMessage, dispatch])

  useEffect(() => {
    dispatch(getExercisesList())
  }, [])

  return (
       <Routes>
        <Route path='*' element={
          <div className="app">
          <Header/>
          <TransitionGroup component={null}>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes location={location}>
              <Route path='/auth/*' element={<AuthPage/>}/>
              <Route path='/user' element={<UserPage/>}/>
              <Route path='/stats' element={<StatsPage/>}/>
              <Route path='/stats/:exerciseID' element={<ExerciseStatsPage/>}/>
              <Route path='*' element={<MainPage/>}/>
            </Routes>
            </CSSTransition>
      </TransitionGroup>
          </div>
        }/>
      </Routes>
  );
}


export default App;
