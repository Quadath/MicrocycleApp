import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch } from './hooks';
import { useTypedSelector } from './hooks/useTypedSelector';
import { getCurrentUser } from './services/authService';
import "./style/main.css"

import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

import "./App.sass"

import Header from './components/header/Header';
import RegisterForm from './components/register-form/RegisterForm';
import LoginForm from './components/login-form/LoginForm'

function App() {
  const location = useLocation();

  const {message: loginMessage} = useTypedSelector(state => state.login)

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [loginMessage])

  return (
       <Routes>
        <Route path='*' element={
          <div className="app">
          <Header/>
          <TransitionGroup component={null}>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Routes location={location}>
                <Route path='/auth/register' element={<RegisterForm/>}/>
                <Route path='/auth/login' element={<LoginForm/>}/>
              </Routes>
            </CSSTransition>
          </TransitionGroup>
          </div>
        }/>
      </Routes>
  );
}


export default App;
