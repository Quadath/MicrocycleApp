import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useAppDispatch } from "../../hooks"
import { LoginRequestBody, loginRequest } from '../../services/authService';
import './LoginForm.sass'

export default function RegisterForm () {
    const dispatch = useAppDispatch()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    function handleSubmit(formData : LoginRequestBody, e : any) {
        e.preventDefault();
        dispatch(loginRequest(formData))
        setFormData({
            username: "",
            password: "",
        })
    }

    return (
        <div className='login-page'>

            <form onSubmit={(e) => handleSubmit(formData, e)} className='login-form'>
                <div className='login-form-header'>
                    <h3 className='login-form-header-text'>Login</h3>

                    <div className='login-form-inputs'>
                        <label htmlFor="username">Username</label>
                        <input placeholder="Your username" type="text" value={formData.username} 
                        onChange={(e) => setFormData({...formData, username: e.target.value})} name='username'/>

                        <label htmlFor="password">Password</label>
                        <input placeholder="Your password" type="password" value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} name='password'/>

                        <button className='login-form-submit'>Login</button>
                    </div>
                </div>
            </form>
            <p className='login-auth-switch'>Don't have account yet? <Link to={'/auth/login'}>Register</Link></p>
        </div>
    )
}

