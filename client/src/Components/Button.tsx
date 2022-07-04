import React from 'react'

const Button = ({children, onClick}: {onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode}) => {
  return (
    <div>
        <button onClick={onClick} className='bg-blue-400 p-2 rounded-md text-white'>{children}</button>
    </div>
  )
}

export default Button