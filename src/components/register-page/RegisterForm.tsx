import './RegisterForm.sass'
import { useState } from 'react'

export default function RegisterForm () {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        repeat: ''
    })

    return (
        <div className='register-page'>

            <form className='register-form'>
                <div className='register-form-header'>
                    <h3 className='register-form-header-text'>Register</h3>

                    <div className='register-form-inputs'>
                        <label htmlFor="name">Name</label>
                        <input placeholder="Your name..." type="text" value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} name='name'/>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}

