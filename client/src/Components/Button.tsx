import React from 'react'

type AppProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  children: React.ReactNode
}

const Button : React.FC<AppProps> = ({children, onClick}) => {
  return (
    <div>
        <button onClick={onClick} className='bg-blue-400 p-2 rounded-md text-white'>{children}</button>
    </div>
  )
}

export default Button