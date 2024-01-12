import { Link } from 'react-router-dom';
import './RegisterForm.sass'
import { useState } from 'react'
import { useAppDispatch } from "../../hooks"
import { RegisterRequestBody } from '../../services/authService';
import { registerRequest } from '../../services/authService';

export default function RegisterForm () {
    const dispatch = useAppDispatch()

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        repeat: ''
    })

    function handleSubmit(formData : RegisterRequestBody, e : any) {
        e.preventDefault();
        dispatch(registerRequest(formData))
        setFormData({
            name: "",
            username: "",
            password: "",
            repeat: ""
        })
    }

    return (
        <div className='register-page'>

            <form onSubmit={(e) => handleSubmit(formData, e)} className='register-form'>
                <div className='register-form-header'>
                    <h3 className='register-form-header-text'>Register</h3>

                    <div className='register-form-inputs'>
                        <label htmlFor="name">Name</label>
                        <input placeholder="Your name" type="text" value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} name='name'/>
                        
                        <label htmlFor="username">Username</label>
                        <input placeholder="Your username" type="text" value={formData.username} 
                        onChange={(e) => setFormData({...formData, username: e.target.value})} name='username'/>

                        <label htmlFor="password">Password</label>
                        <input placeholder="Your password" type="password" value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} name='password'/>

                        <label htmlFor="repeat">Repeat password</label>
                        <input placeholder="Repeat password" type="password" value={formData.repeat} 
                        onChange={(e) => setFormData({...formData, repeat: e.target.value})} name='repeat'/>

                        <button className='register-form-submit'>Register</button>
                    </div>
                </div>
            </form>
            <p className='auth-switch'>Already have account? <Link to={'/auth/login'}>Login</Link></p>
        </div>
    )
}

