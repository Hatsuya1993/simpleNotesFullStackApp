import axios from 'axios'
import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useGlobalContext } from '../context'

const Pagination = () => {

    const {setNotesData, limit, totalNotes} = useGlobalContext()

    useEffect(() => {

    }, [])

    const numberOfPages = Math.ceil(totalNotes / limit)    

    const handlePageClick = async (e: any) => {
        const page = e.selected+1
        try{
            const request = await axios.get(`http://localhost:8000/?page=${page}&limit=${limit}`)
            setNotesData(await request.data)
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <div className='flex justify-center py-5'>
                <ReactPaginate className='flex space-x-5'
                previousLabel={`<`}
                nextLabel={`>`}
                breakLabel={"..."}
                pageCount={numberOfPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={4}
                onPageChange={handlePageClick}
                />
        </div>
    )

    }
export default Pagination
