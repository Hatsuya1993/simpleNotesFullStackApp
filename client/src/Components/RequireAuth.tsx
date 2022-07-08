import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../Context/authContext"

type AppProps = {
    children: React.ReactElement 
}

const RequireAuth : React.FC<AppProps> = ({children}) => {
    const {currentUser} = useAuth()
    return (
        currentUser ? children : <Navigate to={"/login"}/>
    )
}

export default RequireAuth