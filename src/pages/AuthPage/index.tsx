import { Route, Routes, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import RegisterForm from '../../components/register-form/RegisterForm';
import LoginForm from '../../components/login-form/LoginForm'

import { useEffect, useRef } from "react";
import { IUser } from "../../store/types/AuthTypes";
  

export default function AuthPage () {
    const navigate = useNavigate();
    const {user} = useTypedSelector(state => state.session);

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    }, [user, navigate]);

    return (
        <Routes>
            <Route path='register' element={<RegisterForm/>}/>
            <Route path='login' element={<LoginForm/>}/>
        </Routes>
    )
}

