import { Route, Routes, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import RegisterForm from '../../components/register-form/RegisterForm';
import LoginForm from '../../components/login-form/LoginForm'

import { useEffect } from "react";
  

export default function AuthPage () {
    const navigate = useNavigate();
    const {user} = useTypedSelector(state => state.session);
    const {message : loginMessage} = useTypedSelector(state => state.login)

    useEffect(() => {
        if (loginMessage && user) {
            setTimeout(() => navigate('/'), 2000);
        }
    }, [user, loginMessage, navigate])

    return (
        <Routes>
            <Route path='register' element={<RegisterForm/>}/>
            <Route path='login' element={<LoginForm/>}/>
        </Routes>
    )
}