import React, { useEffect, useState } from 'react'
import Button from '../Components/Button'
import TextField from '../Components/TextField'
import axios from 'axios'
import { useGlobalContext } from '../Context/context'
import { useLocation, useNavigate } from 'react-router-dom'
import DropDown from '../Components/DropDown'
import { CurrentNotesInterface } from '../../../server/dataInterface/notesInterface'
import { useAuth } from '../Context/authContext'
import { COMPONENTS } from '../Constants/constants'

const Add : React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {currentUser} = useAuth()
    const state = location.state as CurrentNotesInterface
    const {notesData, setNotesData} = useGlobalContext()
    const [note, setNote] = useState({name: '', task: ''})
    const [inputMissing, setInputMissing] = useState(false)
    const [dropdownValue, setDropdownValue] = useState('very important')    

    useEffect(() => {
        if(state){            
            setNote({name: state.name, task: state.task})
            setDropdownValue(state.typeImportant)
        }
    }, [])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote({
            ...note, [e.target.name] : e.target.value
        })
    }
    const handleDropDownChange = (e: any) => {        
        setDropdownValue(e.target.value)
    }
    const handleClick = async () => {
        if(note.name !== '' && note.task !== ''){
            if(state){
                try {
                    await axios.put('http://localhost:8000/edit', {
                        current: state.name,
                        name: note.name,
                        task: note.task,
                        typeImportant: dropdownValue,
                    })
                    notesData[0].name = note.name
                    notesData[0].task = note.task
                    notesData[0].typeImportant = dropdownValue                    
                } catch (e) {
                    console.log(e);
                }
            }
            else{
                try{
                    await axios.post(`http://localhost:8000/user/${currentUser.uid}/add`, {
                        name: note.name,
                        task: note.task,
                        typeImportant: dropdownValue,
                        user: currentUser.uid
                    })
                    let data = structuredClone(note)
                    data.typeImportant = dropdownValue
                    notesData.push(data)
                    setNotesData(notesData)
                    }
                    catch(e){
                        console.log(e)
                    }
            }
        navigate(`/user/${currentUser.uid}`)
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
            <div className='space-y-2 text-center md:flex md:items-center md:space-x-3 md:space-y-0'>
                <TextField error={true} onChange={handleChange} inputProp={{type:'text', placeholder:'Name', name:'name', value:note.name}}/>
                <TextField error={true} onChange={handleChange} inputProp={{type:'text', placeholder:'Task', name:'task', value:note.task}}/>
                <DropDown onChange={handleDropDownChange} inputProps={{data: [COMPONENTS.SELECT_AN_OPTION, COMPONENTS.VERY_IMPORTANT.toLowerCase(), COMPONENTS.IMPORTANT.toLowerCase(), COMPONENTS.LESS_IMPORTANT.toLowerCase()], typeData: "Importance"}}></DropDown>
            </div>
            <div className='mt-7 text-center'>
            <Button onClick={handleClick}>{state ? COMPONENTS.EDIT_NOTE : COMPONENTS.SUBMIT}</Button>
            </div>
        </div>
    )
}

export default Add