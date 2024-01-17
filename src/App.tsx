import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch } from './hooks';
import { useTypedSelector } from './hooks/useTypedSelector';
import { getCurrentUser } from './services/authService';
import "./style/main.css"


import "./App.sass"

import Header from './components/header/Header';
import AuthPage from './pages/AuthPage';


function App() {

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
          <AuthPage/>
          </div>
        }/>
      </Routes>
  );
}


export default App;
