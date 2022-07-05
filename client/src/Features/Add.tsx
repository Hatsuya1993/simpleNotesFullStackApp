import React, { useState } from 'react'
import Button from '../Components/Button'
import TextField from '../Components/TextField'
import axios from 'axios'
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const navigate = useNavigate()
    const {notesData, setNotesData} = useGlobalContext()
    const [note, setNote] = useState({name: '', task: ''})
    const [inputMissing, setInputMissing] = useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote({
            ...note, [e.target.name] : e.target.value
        })
    }
    const handleClick = async () => {
        if(note.name !== '' && note.task !== ''){
            try{
                await axios.post('http://localhost:8000/add', {
                    name: note.name,
                    task: note.task
                })
                notesData.push(note)
                setNotesData(notesData)
                }
                catch(e){
                    console.log(e)
                }
        navigate('/')
        }
        else{
            setInputMissing(true)
            setTimeout(() => {
                setInputMissing(false)
            }, 5000)
        }
    }
    return (
        <div>
            <div className='text-center pb-3'>
            <h1 className={`${inputMissing === true ? "block" : "hidden"} text-red-700`}>All fields are required</h1>
            </div>
            <div className='space-y-2 text-center'>
                <TextField onChange={handleChange} inputProp={{type:'text', placeholder:'Name', name:'name', value:note.name}}/>
                <TextField onChange={handleChange} inputProp={{type:'text', placeholder:'Task', name:'task', value:note.task}}/>
            </div>
            <div className='mt-7 text-center'>
            <Button onClick={handleClick}>Submit</Button>
            </div>
        </div>
    )
}

export default Add