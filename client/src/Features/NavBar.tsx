import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/authContext'

const NavBar : React.FC = () => {
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout()
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg-blue-400 text-center p-3 md:flex md:justify-between md:items-center'>
            <div className='text-white text-2xl'>
                <Link to='/'><h1>Note Taking App</h1></Link>
            </div>
            <div className='text-white text-2xl text-center'>
                <ul className='space-x-5 md:flex'>
                    <li>
                        <Link to='/'>
                        Notes
                        </Link>
                    </li>
                    <li>
                        <Link to='/add'>
                        Add Notes
                        </Link>
                    </li>
                    <li>
                        {currentUser ? <Link to="#" onClick={handleLogout}>Log Out</Link> : <Link to='/login'>Login</Link>}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar