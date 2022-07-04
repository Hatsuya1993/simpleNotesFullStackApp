import express from 'express'
import { home, postNewNote, deleteNote, deleteAllNote } from '../controller/notesController'

export const noteRoutes = express.Router()

noteRoutes.route("/").get(home)

noteRoutes.route('/add').post(postNewNote)

noteRoutes.route('/delete/:name').delete(deleteNote)

noteRoutes.route('/deleteAll').delete(deleteAllNote)