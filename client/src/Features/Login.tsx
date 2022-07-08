import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import TextField from '../Components/TextField'
import { useAuth } from '../Context/authContext'

const Login = () => {
    const navigate = useNavigate()
    const [loginFail, setLoginFail] = useState('')
    const {login} = useAuth()
    const [user, setUser] = useState({email: '', password: ''})
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user, [e.target.name] : e.target.value
        })
    }
    const handleLogin = async () => {
        try {
            await login(user.email, user.password)
            navigate('/')
        } catch (error) {
            setLoginFail("Email and Password is incorrect")
            console.log(error)
        }
    }
    return (
        <div>
            {loginFail ? <h1 className='text-white bg-red-600 w-60 p-2 rounded-md mx-auto mb-4'>{loginFail}</h1> : ""}
            <div className='text-center md:flex md:space-x-4'>
            <TextField inputProp={{type:'email', placeholder:'Email', name:'email', value:user.email}} onChange={handleChange}/>
            <TextField inputProp={{type:'password', placeholder:'Password', name:'password', value:user.password}} onChange={handleChange}/>
            <Button onClick={handleLogin}>Login</Button>
            </div>
        </div>
    )
}

export default Login
