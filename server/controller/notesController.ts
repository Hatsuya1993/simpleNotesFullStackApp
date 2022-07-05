import { Request, Response } from 'express'
import { Note } from '../models/notesModel'

export const home = async (req: Request, res: Response) => {
    if(req.query.page && req.query.limit){
        const page: number = parseInt(req.query.page.toString())
        const limit: number = parseInt(req.query.limit.toString())
        const startIndex = (page - 1) * limit
        const endBox = page * limit
        Note.find({}, (err: any, result: any) => {
            if(err){
                res.json(err)
            }
            else{
                res.json({data: result.slice(startIndex, endBox), currentPage: page})
            }
        })
    }
    else{
        Note.find({}, (err: any, result: any) => {
            if(err){
                res.json(err)
            }
            else{
                res.json({data: result, currentPage: 1})
            }
        })
    }
}

export const postNewNote = async (req: Request, res: Response) => {
    const note = req.body
    try {
        let checkNoteExist = await Note.findOne({name: note.name})
        if(checkNoteExist) return res.status(400).json({
            statusCode: 400,
            errorMessage: "Name already exist"
        })
        const newNote = new Note(note)
        await newNote.save()
        res.json(note) 
    } catch (error) {
        console.log(error)
    }
}

export const deleteNote = async (req: Request, res: Response) => {
    const noteParamName = req.params.name
    try {
        const removeNote = await Note.deleteOne({name: noteParamName})
        res.json({
            "Response": `${noteParamName} deleted`,
            "Status Code": `${res.statusCode}`
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteAllNote = async (req: Request, res: Response) => {
    try {
        const removeAllNote = await Note.deleteMany({})
        res.json({
            "Response": `${removeAllNote} deleted`,
            "Status Code": `${res.statusCode}`
        })
    } catch (error) {
        console.log(error)
    }
}