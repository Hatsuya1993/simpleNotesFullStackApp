import { Navigate } from "react-router-dom"
import { useAuth } from "../Context/authContext"

const RequireAuth = ({children}: {children: any}) => {
    const {currentUser} = useAuth()
    return (
        currentUser ? children : <Navigate to={"/login"}/>
    )
}

export default RequireAuth