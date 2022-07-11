import { Schema, model } from "mongoose"
import { NotesInterface } from "../dataInterface/notesInterface"

const noteSchema = new Schema<NotesInterface>({
    name: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true
    },
    typeImportant: {
        type: String,
        enum: ['Very Important','Important','Less Important'],
        required: true,
        default: 'Very Important'
    },
    user: {
        type: String,
        required: true
    }
})

export const Note = model<NotesInterface>('Note', noteSchema)