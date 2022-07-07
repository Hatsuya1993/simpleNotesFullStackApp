import express from 'express'
import { home, postNewNote, deleteNote, deleteAllNote, filterData, editNote } from '../controller/notesController'

export const noteRoutes = express.Router()

noteRoutes.route("/").get(home)

noteRoutes.route('/add').post(postNewNote)

noteRoutes.route('/delete/:name').delete(deleteNote)

noteRoutes.route('/deleteAll').delete(deleteAllNote)

noteRoutes.route("/:filterData").get(filterData)

noteRoutes.route("/edit").put(editNote)
