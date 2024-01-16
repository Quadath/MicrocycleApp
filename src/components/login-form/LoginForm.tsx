import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useAppDispatch } from "../../hooks"
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDebounce } from 'usehooks-ts';

import { LoginRequestBody, loginRequest } from '../../services/authService';
import './LoginForm.sass'

export default function RegisterForm () {
    const dispatch = useAppDispatch()

    const {message, loading, errors} = useTypedSelector(state => state.login)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const [formErrors, setFormErrors] = useState({
        username: false,
        password: false,
    })

    const debouncedData = useDebounce<typeof formData>(formData, 250)

    useEffect(() => {
        setFormErrors({
            username: formData.username === '',
            password: formData.password === '',
        })
    }, [debouncedData])


    function handleSubmit(formData : LoginRequestBody, e : any) {
        e.preventDefault();
        dispatch(loginRequest(formData))
        setFormData({
            username: "",
            password: "",
        })
    }

    return (
        <div className='auth-page login'>
            <form onSubmit={(e) => handleSubmit(formData, e)} className='auth-form login'>
                <div className='auth-form-header login'>
                    <h3 className='auth-form-header-text login'>Login</h3>

                    <div className='auth-form-inputs login'>
                        <label htmlFor="username">Username</label>
                        <input placeholder="Your username" type="text" value={formData.username} 
                        onChange={(e) => setFormData({...formData, username: e.target.value})} name='username'/>

                        <label htmlFor="password">Password</label>
                        <input placeholder="Your password" type="password" value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} name='password'/>

                        <button disabled={formErrors.username || formErrors.password} className='auth-form-submit login'>Login</button>
                    </div>
                </div>
            </form>
            <p className='auth-switch login'>Don't have account yet? <Link to={'/auth/register'}>Register</Link></p>
        </div>
    )
}

