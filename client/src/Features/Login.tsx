import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import TextField from '../Components/TextField'
import { useAuth } from '../Context/authContext'

const Login : React.FC = () => {
    const {currentUser, updatePasswordDetails} = useAuth()
    const navigate = useNavigate()
    const [authFail, setAuthFail] = useState('')
    const {login, signup} = useAuth()
    const [user, setUser] = useState({email: '', password: ''})
    useEffect(() => {
        if(currentUser){
            setUser({email: currentUser.email, password: ''})
        }
    }, [])
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
            setAuthFail("Email and Password is incorrect")
            console.log(error)
        }
    }

    const handleRegister = async () => {
        try {
            await signup(user.email, user.password)
            navigate('/')
        } catch (error) {
            setAuthFail("Error during registration")
            console.log(error)
        }
    }

    const handleManageAccount = async () => {
        if(user.password !== ''){
            try {
                await updatePasswordDetails(user.password)
                navigate('/')
            } catch (error) {
                setAuthFail("Password doesn't meet the requirement")
                console.log(error)
            }
        }
    }
    return (
        <div>
            {authFail ? <h1 className='text-white bg-red-600 w-60 p-2 rounded-md mx-auto mb-4 text-center'>{authFail}</h1> : ""}
            <div className='text-center md:flex md:space-x-4 space-y-1 md:space-y-0'>
            <TextField inputProp={{type:'email', placeholder:'Email', name:'email', value:user.email}} onChange={handleChange}/>
            <TextField inputProp={{type:'password', placeholder:'Password', name:'password', value:user.password}} onChange={handleChange}/>
            {currentUser ? (
            <Button onClick={handleManageAccount}>Change Password</Button>
            ) : (
                <div className='space-y-1 md:space-y-0 md:flex md:gap-1'>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
                </div>
            )}

            </div>
        </div>
    )
}

export default Login
