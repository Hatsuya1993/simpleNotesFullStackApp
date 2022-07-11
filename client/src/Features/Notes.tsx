import axios from 'axios'
import React, { useEffect } from 'react'
import {NotesInterface} from '../../../server/dataInterface/notesInterface'
import Button from '../Components/Button'
import Card from '../Components/Card'
import DropDown from '../Components/DropDown'
import Pagination from '../Components/Pagination'
import { useAuth } from '../Context/authContext'
import {useGlobalContext} from '../Context/context'

const Notes : React.FC = () => {

  const {notesData, setNotesData, limit, page, loading, setLoading} = useGlobalContext()
  const {currentUser} = useAuth()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const response = await axios.get(`http://localhost:8000/user/${currentUser.uid}`)
      const data = response.data
      const currentNotes = data.data.filter((each: NotesInterface) => each.user === currentUser.uid)
      setNotesData(currentNotes)
      setLoading(false)
    }
    fetchData();
  }, []);

  const deleteAll = async () => {
    try {
      await axios.delete('http://localhost:8000/deleteAll')
      setNotesData([])
    } catch (error) {
      console.log(error);
    }
  }

  const handleDropDownFilter = async (e: any) => {
    try {
      setLoading(true)
      let filteredData = await axios.get(`http://localhost:8000/user/${currentUser.uid}/${e.target.value}?page=${page}&limit=${limit}`)
      setNotesData(filteredData.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const renderNotes = () => {
    if(!loading){
      if(notesData.length > 0){
        return (
          <div>
            <div className='text-center md:flex md:items-center md:justify-between'>
            <Button onClick={deleteAll}>Delete All</Button>
            <DropDown  onChange={handleDropDownFilter} inputProps={{data: ['Pick an option','Very Important','Important','Less Important'], typeData: "Filter By"}}></DropDown>
            </div>
          <div className='space-y-5 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3'>
            {notesData.map((eachNote: NotesInterface, index: number) => {
              return (
                <Card key={index} typeImportant={eachNote.typeImportant} name={eachNote.name} task={eachNote.task}/>
              )
            })}
          </div>
          <Pagination/>
          </div>
        )
      }
      else{
        return(
          <div className='text-center'>
          <Button onClick={() => {}}>No Data</Button>
          <DropDown  onChange={handleDropDownFilter} inputProps={{data: ['','Very Important','Important','Less Important'], typeData: "Filter By"}}></DropDown>
        </div>
        )
      }
    }
    else {
      return (
        <div className='text-center'>
          <Button onClick={() => {}}>Loading...</Button>
        </div>
      )
    }
  }

  return (
    <div>
        {renderNotes()}
    </div>
  )
}


export default Notes