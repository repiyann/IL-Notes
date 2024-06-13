import express from 'express'
import pool from '../database/config.js'
import { createNotes, getNotes, getNoteByID, updateNote, deleteNote } from '../controllers/notes.controller.js'

const router = express.Router()

router.post('/createNote', async (req, res, next) => await createNotes(req, res, pool, next))
router.get('/getNotes', async (req, res, next) => await getNotes(req, res, pool, next))
router.get('/getNote/:id', async (req, res, next) => await getNoteByID(req, res, pool, next))
router.put('/updateNote/:id', async (req, res, next) => await updateNote(req, res, pool, next))
router.delete('/deleteNote/:id', async (req, res, next) => await deleteNote(req, res, pool, next))

export default router