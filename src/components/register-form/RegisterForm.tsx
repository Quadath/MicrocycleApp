import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useAppDispatch } from "../../hooks"
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDebounce } from 'usehooks-ts';

import { RegisterRequestBody, registerRequest } from '../../services/authService';
import './RegisterForm.sass'

export default function RegisterForm () {
    const dispatch = useAppDispatch()
    const {message, loading, error} = useTypedSelector(state => state.register)


    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        repeat: ''
    })
    const [formErrors, setFormErrors] = useState({
        name: false,
        username: false,
        password: false,
        repeat: false,
        full: false
    })

    const debouncedData = useDebounce<typeof formData>(formData, 1000)
    
    useEffect(() => {
        setFormErrors({
            name: formData.name !== '' && formData.name.length < 2,
            username: formData.username !== '' && formData.username.length < 5,
            password: formData.password !== '' && formData.password.length < 6,
            repeat: formData.repeat !== '' && formData.password !== formData.repeat,
            full: formData.name !== '' && formData.username !== '' && formData.password !== '' && formData.repeat !==''
        })
    }, [debouncedData])


    const isDataValid = () => (!formErrors.name && !formErrors.username && !formErrors.password && !formErrors.repeat)

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
                </div>
                <div className='auth-form-inputs register'>
                    <label className={`${(formErrors.name && formData.name !== '') ? 'error' : ''}`}>Name
                    <span> 2 characters minimum</span>
                    <input placeholder="Your name" type="text" autoComplete='false' value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} name='name'/>
                    </label>

                    <label className={`${(formErrors.username && formData.username !== '') ? 'error' : ''}`}>Username
                    <span> 5 characters minimum</span>
                    <input placeholder="Your username" type="text" autoComplete='false' value={formData.username} 
                    onChange={(e) => setFormData({...formData, username: e.target.value.replace(/[^a-zA-Z0-9]/g, '')})} name='username'/>
                    </label>

                    <label className={`${(formErrors.password && formData.password !== '') ? 'error' : ''}`}>Password
                    <span> 6 characters minimum</span>
                    <input placeholder="Your password" type="password" value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} name='password'/>
                    </label>

                    <label className={`${(formErrors.repeat && formData.repeat !== '') ? 'error' : ''}`}>Repeat
                    <span> Passwords do not match</span>
                    <input placeholder="Repeat password" type="password" value={formData.repeat} 
                    onChange={(e) => setFormData({...formData, repeat: e.target.value.replace(/[^a-zA-Z0-9!#()&.]/g, '')})} name='repeat'/>
                    </label>

                    <button disabled={(!isDataValid() || !formErrors.full)} className='auth-form-submit'>
                        {loading ? '...' : "Register"}
                    </button>
                </div>
            </form>
            <div className={`auth-message register${message[0] === 'A' ? ' success' : ''}${message[0] === 'E' ? ' error' : ''}`}>
                {message === "Error" ? error : message}
            </div>
            <p className='auth-switch register'>Already have account? <Link to={'/auth/login'}>Login</Link></p>

        </div>
    )
}

