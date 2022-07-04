import axios from 'axios'
import React, { useState, useContext, useEffect, createContext } from 'react'

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [notesData, setNotesData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const request = await axios.get('http://localhost:8000')
                setNotesData(await request.data)
            }
            catch(e){
                console.log(e)
            }
            }
            fetchData();
        }, [])
    
        return (<AppContext.Provider value={{
            notesData, setNotesData
            }}>{children}</AppContext.Provider>)
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}