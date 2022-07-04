import axios from 'axios'
import {NotesInterface} from '../../../server/dataInterface/notesInterface'
import Button from '../Components/Button'
import Card from '../Components/Card'
import {useGlobalContext} from '../context'

const Notes = () => {

  const {notesData, setNotesData} = useGlobalContext()

  const deleteAll = async () => {
    setNotesData([])
    try {
      await axios.delete('http://localhost:8000/deleteAll')
    } catch (error) {
      console.log(error);
    }
  }

  const renderNotes = () => {
    if(notesData.length > 0){
      return (
        <div>
          <div className='text-center'>
          <Button onClick={deleteAll}>Delete All</Button>
          </div>
        <div className='space-y-5 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3'>
          {notesData.map((eachNote: NotesInterface) => {
            return (
              <Card name={eachNote.name} task={eachNote.task}/>
            )
          })}
        </div>
        </div>

      )
    }
    else {
      return (
        <div className='text-center'>
        <button type="button" className="bg-blue-400 rounded-md text-white font-bold p-2" disabled>
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
        </svg>
        Processing...
        </button>      
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