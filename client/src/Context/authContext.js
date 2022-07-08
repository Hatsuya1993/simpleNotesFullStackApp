    import React, { useContext, useState, useEffect } from "react"
    import { signInWithEmailAndPassword, signOut } from "firebase/auth";
    import { auth } from '../Firebase/firebase'

    const AuthContext = React.createContext()

    const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        await signOut(auth)
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    )
    }

    export const useAuth = () => {
        return useContext(AuthContext)
        }

export {AuthContext, AuthProvider}