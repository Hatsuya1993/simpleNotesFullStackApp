import { Schema, model } from "mongoose"
import { NotesInterface } from "../dataInterface/notesInterface"

const noteSchema = new Schema<NotesInterface>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    task: {
        type: String,
        required: true
    }
})

export const Note = model<NotesInterface>('Note', noteSchema)