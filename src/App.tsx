import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getExercisesList } from './services/exerciseService';
import { useAppDispatch } from './hooks';
import { useTypedSelector } from './hooks/useTypedSelector';

import "./App.sass"

import Header from './components/header/Header';
import RegisterForm from './components/register-form/RegisterForm';
import LoginForm from './components/login-form/LoginForm'

function App() {
  return (
    
    <BrowserRouter basename="/app">

      <Routes>
        <Route path='*' element={
          <div className="app">
          <Header/>
          <Routes>
            <Route path='/auth/register' element={<RegisterForm/>}/>
            <Route path='/auth/login' element={<LoginForm/>}/>
          </Routes>
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
