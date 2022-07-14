import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {NotesInterface} from '../../../server/dataInterface/notesInterface'
import Button from '../Components/Button'
import Card from '../Components/Card'
import DropDown from '../Components/DropDown'
import Pagination from '../Components/Pagination'
import TextField from '../Components/TextField'
import { useAuth } from '../Context/authContext'
import {useGlobalContext} from '../Context/context'

const Notes : React.FC = () => {

  const {notesData, setNotesData, limit, page, loading, setLoading} = useGlobalContext()
  const {currentUser} = useAuth()
  const [inputTitle, setInputTitle] = useState<string>("")

  const fetchData = async () => {
    setLoading(true)
    const response = await axios.get(`http://localhost:8000/user/${currentUser.uid}`)
    const data = response.data
    const currentNotes = data.data.filter((each: NotesInterface) => each.user === currentUser.uid)
    setNotesData(currentNotes)
    setLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteAll = async () => {
    try {
      await axios.delete(`http://localhost:8000/deleteAll/${currentUser.uid}`)
      setNotesData([])
    } catch (error) {
      console.log(error);
    }
  }

  const handleDropDownFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      setLoading(true)
      let filteredData = await axios.get(`http://localhost:8000/user/${currentUser.uid}/${e.target.value}?page=${page}&limit=${limit}`)
      setNotesData(filteredData.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChangeTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value)
  }

  const handleClickFilter = async () => {
    if(inputTitle === ''){
      fetchData()
    }
    setNotesData((prev: NotesInterface[]) => {
      return prev.filter((each: NotesInterface) => each.name.toLowerCase() === inputTitle.toLowerCase())
    })
  }

  const renderNotes = () => {
    if(!loading){
      if(notesData.length > 0){
        return (
          <div className='space-y-4 md:space-y-0'>
            <div className='md:flex md:items-center md:space-x-3 space-x-0 space-y-1 md:space-y-0'>
            <DropDown  onChange={handleDropDownFilter} inputProps={{data: ['Pick an option','Very Important','Important','Less Important'], typeData: "Filter By"}}></DropDown>
            <TextField onChange={handleOnChangeTitle} error={false} inputProp={{name: "title", placeholder: "Title", type: "text", value: inputTitle}}></TextField>
            <Button onClick={handleClickFilter}>Filter</Button>
            </div>
            <div className='text-center md:flex md:items-center md:justify-between'>
            <Button onClick={deleteAll}>Delete All</Button>
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
          <div className='text-center space-y-1 md:space-y-0'>
          <Button onClick={() => {}}>No Data</Button>
          <TextField onChange={handleOnChangeTitle} error={false} inputProp={{name: "title", placeholder: "Title", type: "text", value: inputTitle}}></TextField>
          <Button onClick={handleClickFilter}>Filter</Button>
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