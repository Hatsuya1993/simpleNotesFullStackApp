import axios from 'axios'
import React from 'react'

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [notesData, setNotesData] = React.useState([])
    const [notesPage, setNotesPage] = React.useState(0)
    const [totalNotes, setTotalNotes] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    const limit = 9 
    const page = 1

    React.useEffect(() => {
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
    return React.useContext(AppContext)
}

export {AppContext, AppProvider}