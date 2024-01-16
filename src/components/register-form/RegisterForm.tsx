import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useAppDispatch } from "../../hooks"
import { RegisterRequestBody, registerRequest } from '../../services/authService';
import './RegisterForm.sass'

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
        <div className='auth-page register'>
            <form onSubmit={(e) => handleSubmit(formData, e)} className='auth-form register'>
                <div className='auth-form-header register'>
                    <h3 className='auth-form-header-text register'>Register</h3>

                    <div className='auth-form-inputs register'>
                        <label htmlFor="name">Name</label>
                        <input placeholder="Your name" type="text" autoComplete='false' value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} name='name'/>
                        
                        <label htmlFor="username">Username</label>
                        <input placeholder="Your username" type="text" autoComplete='false' value={formData.username} 
                        onChange={(e) => setFormData({...formData, username: e.target.value})} name='username'/>

                        <label htmlFor="password">Password</label>
                        <input placeholder="Your password" type="password" value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} name='password'/>

                        <label htmlFor="repeat">Repeat password</label>
                        <input placeholder="Repeat password" type="password" value={formData.repeat} 
                        onChange={(e) => setFormData({...formData, repeat: e.target.value})} name='repeat'/>

                        <button className='auth-form-submit'>Register</button>
                    </div>
                </div>
            </form>
            <p className='auth-switch register'>Already have account? <Link to={'/auth/login'}>Login</Link></p>

        </div>
    )
}

