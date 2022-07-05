import axios from 'axios'
import React, { useState, useContext, useEffect, createContext } from 'react'

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [notesData, setNotesData] = useState([])
    const [totalNotes, setTotalNotes] = useState(0)

    const limit = 9 
    const page = 1

    useEffect(() => {
        const fetchData = async () => {
            try{
                const request = await axios.get(`http://localhost:8000/?page=${page}&limit=${limit}`)
                const requestCount = await axios.get(`http://localhost:8000`)
                setNotesData(await request.data)
                setTotalNotes(await requestCount.data.length)
            }
            catch(e){
                console.log(e)
            }
            }
            fetchData();
        }, [])
    
        return (<AppContext.Provider value={{
            notesData, setNotesData, limit, totalNotes
            }}>{children}</AppContext.Provider>)
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}