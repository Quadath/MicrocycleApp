import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import RegisterForm from '../../components/register-form/RegisterForm';
import LoginForm from '../../components/login-form/LoginForm'

import {
    TransitionGroup,
    CSSTransition
  } from "react-transition-group";
import { useEffect } from "react";
  

export default function AuthPage () {
    const location = useLocation();

    const navigate = useNavigate();
    const {user} = useTypedSelector(state => state.session);
    const {message : loginMessage} = useTypedSelector(state => state.login)

    useEffect(() => {
        if (loginMessage && user) {
            setTimeout(() => navigate('/'), 2000);
        }
    }, [user, loginMessage])

    return (
        
        <TransitionGroup component={null}>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes location={location}>
                <Route path='/auth/register' element={<RegisterForm/>}/>
                <Route path='/auth/login' element={<LoginForm/>}/>
            </Routes>
            </CSSTransition>
      </TransitionGroup>
    )
}