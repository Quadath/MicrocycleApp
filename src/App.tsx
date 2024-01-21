import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch } from './hooks';
import { useTypedSelector } from './hooks/useTypedSelector';
import { getCurrentUser } from './services/authService';

import "./App.sass"


import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

import Header from './components/header/Header';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';


function App() {

  const {message: loginMessage} = useTypedSelector(state => state.login)

  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [loginMessage, dispatch])

  return (
       <Routes>
        <Route path='*' element={
          <div className="app">
          <Header/>
          <TransitionGroup component={null}>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes location={location}>
              <Route path='/auth/*' element={<AuthPage/>}/>
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
