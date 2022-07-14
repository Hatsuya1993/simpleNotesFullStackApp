import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { COMPONENTS } from '../Constants/constants';
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
                <Link to={currentUser ? `/user/${currentUser.uid}` : '/login'}><h1>Note Taking App</h1></Link>
            </div>
            <div className='text-white text-2xl text-center'>
                <ul className='space-x-5 md:flex'>
                    <li>
                        <Link to={currentUser ? `/user/${currentUser.uid}` : '/login'}>
                        {COMPONENTS.NOTES}
                        </Link>
                    </li>
                    <li>
                        <Link to={currentUser ? `/user/${currentUser.uid}/add` : '/login'}>
                        {COMPONENTS.ADD_NOTES}
                        </Link>
                    </li>
                    <li>
                        {currentUser ? <Link to="#" onClick={handleLogout}>{COMPONENTS.LOGOUT}</Link> : <Link to='/login'>{COMPONENTS.LOGIN}</Link>}
                    </li>
                    {currentUser ? <li><Link to={`/user/${currentUser.uid}/manage`}>{COMPONENTS.MANAGE}</Link></li> : ""}
                </ul>
            </div>
        </div>
    )
}

export default NavBar