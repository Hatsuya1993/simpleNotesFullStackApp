import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NotesInterface } from '../../../server/dataInterface/notesInterface'
import { useGlobalContext } from '../Context/context'
import Button from './Button'

const Card = ({name, task, typeImportant}: NotesInterface) => {

  const {notesData, setNotesData} = useGlobalContext()

  const navigate = useNavigate()

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
      navigate(`/${typeImportant}/${name}`, {state: {name, task, typeImportant}})
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
    <Button onClick={handleDelete}>Delete</Button>
    <Button onClick={handleEditNote}>Edit</Button>
  </div>
</div>
  )
}

export default Card
