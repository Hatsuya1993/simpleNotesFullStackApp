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
        enum: ['very important','important','less important'],
        required: true,
        default: 'very important'
    },
    user: {
        type: String,
        required: true
    }
})

export const Note = model<NotesInterface>('Note', noteSchema)