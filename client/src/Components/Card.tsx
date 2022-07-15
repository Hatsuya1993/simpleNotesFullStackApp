import axios from 'axios'
import React from 'react'
import * as ReactRouterDOM from 'react-router-dom'
import { NotesInterface } from '../../../server/dataInterface/notesInterface'
import { useAuth } from '../Context/authContext'
import { useGlobalContext } from '../Context/context'
import Button from './Button'
import { COMPONENTS } from '../Constants/constants'

const Card : React.FC<NotesInterface> = ({name, task, typeImportant}) => {

  const {currentUser} = useAuth()

  const {notesData, setNotesData} = useGlobalContext()

  const navigate = ReactRouterDOM.useNavigate()

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/delete/${name}`)
      const newNoteList = notesData.filter((eachNote: NotesInterface) => eachNote.name != name)
      setNotesData(newNoteList)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditNote = async () => {
    try {
      navigate(`/${currentUser.uid}/${typeImportant}/${name}`, {state: {name, task, typeImportant}})
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <div className="m-0 max-w-sm rounded overflow-hidden shadow-lg flex items-center justify-between px-6 py-4">
  <div>
    <h3 className="font-bold text-xl mb-2">{name}</h3>
    <p className="text-gray-700 text-base">
        {task}
    </p>
    <p className='bg-gray-200 p-1 my-2 rounded-md'>{typeImportant}</p>
  </div>
  <div className='flex gap-2'>
    <Button onClick={handleDelete}>{COMPONENTS.DELETE.toUpperCase()}</Button>
    <Button onClick={handleEditNote}>{COMPONENTS.EDIT.toUpperCase()}</Button>
  </div>
</div>
  )
}

export default Card
