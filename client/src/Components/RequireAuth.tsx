import React from "react"
import * as ReactRouterDOM from "react-router-dom"
import { useAuth } from "../Context/authContext"

type AppProps = {
    children: React.ReactElement 
}

const RequireAuth : React.FC<AppProps> = ({children}) => {
    const {currentUser} = useAuth()
    return (
        currentUser ? children : <ReactRouterDOM.Navigate to={"/login"}/>
    )
}

export default RequireAuth