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
                res.json(result.slice(startIndex, endBox))
            }
        })
    }
    else{
        Note.find({}, (err: any, result: any) => {
            if(err){
                res.json(err)
            }
            else{
                res.json(result)
            }
        })
    }
}

export const postNewNote = async (req: Request, res: Response) => {
    const note = req.body
    try {
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