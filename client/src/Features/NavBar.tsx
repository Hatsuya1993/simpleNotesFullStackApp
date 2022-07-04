import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
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
            </ul>
        </div>
    </div>
  )
}

export default NavBar