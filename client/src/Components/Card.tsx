import axios from 'axios'
import React from 'react'
import { NotesInterface } from '../../../server/dataInterface/notesInterface'
import { useGlobalContext } from '../context'
import Button from './Button'

const Card = ({name, task}: NotesInterface) => {

  const {notesData, setNotesData} = useGlobalContext()

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/delete/${name}`)
      const newNoteList = notesData.filter((eachNote: NotesInterface) => eachNote.name != name)
      setNotesData(newNoteList)
    } catch (error) {
      console.log(error);
    }
  }

  return (
  <div className="max-w-sm rounded overflow-hidden shadow-lg flex items-center justify-between px-6 py-4">
  <div>
    <div className="font-bold text-xl mb-2">{name}</div>
    <p className="text-gray-700 text-base">
        {task}
    </p>
  </div>
  <div>
    <Button onClick={handleDelete}>Delete</Button>
  </div>
</div>
  )
}

export default Card
