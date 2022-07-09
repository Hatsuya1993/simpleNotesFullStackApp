import axios from 'axios'
import React, { useState, useContext, useEffect, createContext } from 'react'

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [notesData, setNotesData] = useState([])
    const [notesPage, setNotesPage] = useState(0)
    const [totalNotes, setTotalNotes] = useState(0)
    const [loading, setLoading] = useState(false)

    const limit = 9 
    const page = 1

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const request = await axios.get(`http://localhost:8000/user/:uid?page=${page}&limit=${limit}`)
                const requestCount = await axios.get(`http://localhost:8000/user/:uid`)
                setNotesPage(request.data)
                setNotesData(request.data.data)
                setTotalNotes(requestCount.data.data.length)
                setLoading(false)
            }
            catch(e){
                console.log(e)
            }
            }
            fetchData();
        }, [])
    
        return (<AppContext.Provider value={{
            notesData, setNotesData, limit, totalNotes, page, loading, notesPage, setNotesPage, setLoading
            }}>{children}</AppContext.Provider>)
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}