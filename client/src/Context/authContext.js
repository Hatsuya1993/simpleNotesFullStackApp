    import React, { useContext, useState, useEffect } from "react"
    import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updatePassword, reauthenticateWithCredential } from "firebase/auth";
    import { auth } from '../Firebase/firebase'

    const AuthContext = React.createContext()

    const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // const reauthenticate = async () => {
    //     await reauthenticateWithCredential(auth.currentUser, )
    // }

    const logout = async () => {
        await signOut(auth)
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    const updatePasswordDetails = async (password) => {
        await updatePassword(auth.currentUser, password)
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
        updatePasswordDetails,
        setCurrentUser
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