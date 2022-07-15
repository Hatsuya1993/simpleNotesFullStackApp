import React from 'react';
import * as ReactRouterDOM from 'react-router-dom'
import { COMPONENTS } from '../Constants/constants';
import { useAuth } from '../Context/authContext'

const NavBar : React.FC = () => {
    const {currentUser, logout} = useAuth()
    const navigate = ReactRouterDOM.useNavigate()
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
                <ReactRouterDOM.Link to={currentUser ? `/user/${currentUser.uid}` : '/login'}><h1>Note Taking App</h1></ReactRouterDOM.Link>
            </div>
            <div className='text-white text-2xl text-center'>
                <ul className='space-x-5 md:flex'>
                    <li>
                        <ReactRouterDOM.Link to={currentUser ? `/user/${currentUser.uid}` : '/login'}>
                        {COMPONENTS.NOTES}
                        </ReactRouterDOM.Link>
                    </li>
                    <li>
                        <ReactRouterDOM.Link to={currentUser ? `/user/${currentUser.uid}/add` : '/login'}>
                        {COMPONENTS.ADD_NOTES}
                        </ReactRouterDOM.Link>
                    </li>
                    <li>
                        {currentUser ? <ReactRouterDOM.Link to="#" onClick={handleLogout}>{COMPONENTS.LOGOUT}</ReactRouterDOM.Link> : <ReactRouterDOM.Link to='/login'>{COMPONENTS.LOGIN}</ReactRouterDOM.Link>}
                    </li>
                    {currentUser ? <li><ReactRouterDOM.Link to={`/user/${currentUser.uid}/manage`}>{COMPONENTS.MANAGE}</ReactRouterDOM.Link></li> : ""}
                </ul>
            </div>
        </div>
    )
}

export default NavBar