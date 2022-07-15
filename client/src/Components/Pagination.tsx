import axios from 'axios'
import React from 'react'
import { useGlobalContext } from '../Context/context'
import Button from './Button'

type AppProps = {

}

const Pagination : React.FC<AppProps> = () => {

    const {setNotesData, limit, totalNotes, notesData, loading} = useGlobalContext()

    React.useEffect( () => {
        setNotesData(notesData)  
    }, [loading])

    const numberOfPages = Math.ceil(totalNotes / limit)    

    const handlePageClick = async (e: any) => {
        const page = parseInt(e.target.innerText)
        try{
            const request = await axios.get(`http://localhost:8000/?page=${page}&limit=${limit}`)
            setNotesData(request.data.data)
        }
        catch(e){
            console.log(e)
        }
    }

    const PaginateNotes =  () => {
        let storePaginate = []
        for(let i = 1; i <= numberOfPages; i++){
            storePaginate.push(i)
        }
        return storePaginate.map((each) => {
            return (
                <div key={each}>
                    <ul>
                        <li><Button onClick={handlePageClick} key={each}>{each}</Button></li>
                    </ul>
                </div>
            )
        })
    }

    return (
        <div className='flex justify-center py-5 space-x-2 items-center'>
                {PaginateNotes()}
        </div>
    )

    }
export default Pagination
