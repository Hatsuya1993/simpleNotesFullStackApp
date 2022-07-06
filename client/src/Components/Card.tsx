import axios from 'axios'
import { NotesInterface } from '../../../server/dataInterface/notesInterface'
import { useGlobalContext } from '../context'
import Button from './Button'

const Card = ({name, task, typeImportant}: NotesInterface) => {

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
  <div className="m-0 max-w-sm rounded overflow-hidden shadow-lg flex items-center justify-between px-6 py-4">
  <div>
    <h3 className="font-bold text-xl mb-2">{name}</h3>
    <p className="text-gray-700 text-base">
        {task}
    </p>
    <p className='bg-gray-200 p-1 my-2 rounded-md'>{typeImportant}</p>
  </div>
  <div>
    <Button onClick={handleDelete}>Delete</Button>
  </div>
</div>
  )
}

export default Card
