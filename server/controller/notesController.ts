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
    const uid = req.params.uid
    try {
        const removeAllNote = await Note.deleteMany({user: uid})
        res.json({
            "Response": `${removeAllNote} deleted`,
            "Status Code": `${res.statusCode}`
        })
    } catch (error) {
        console.log(error)
    }
}

export const filterData = async (req: Request, res: Response) => {
    const filterNewData = req.params.filterData
    const uid = req.params.uid
    if(req.query.page && req.query.limit){
        const page: number = parseInt(req.query.page.toString())
        const limit: number = parseInt(req.query.limit.toString())
        const startIndex = (page - 1) * limit
        const endBox = page * limit
        Note.find({typeImportant: filterNewData, user: uid}, (err: any, result: any) => {
            if(err){
                res.json(err)
            }
            else{
                res.json({data: result.slice(startIndex, endBox), currentPage: page})
            }
        })
    }
    else{
        Note.find({typeImportant: filterNewData, user: uid}, (err: any, result: any) => {
            if(err){
                res.json(err)
            }
            else{
                res.json({data: result, currentPage: 1})
            }
        })
    }
}

export const editNote = (req: Request, res: Response) => {
    const note = req.body
    Note.findOneAndUpdate({name: note.current}, {name: note.name, task: note.task, typeImportant: note.typeImportant}, (err: any, result: any) => {
        if(err){
            res.json(err)
        }
        else{
            res.json({data: result})
        }
    })
}