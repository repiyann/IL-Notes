import validator from 'validator'

async function createNotes(req, res, pool, next) {
	try {
		const { title, datetime, note } = req.body

		if (validator.isEmpty(title) || validator.isEmpty(datetime) || validator.isEmpty(note)) {
			return res.status(400).json({ message: 'Input fields cannot be empty' })
		}

		if (!validator.isISO8601(datetime)) {
			return res.status(400).json({ message: 'Datetime field must be datetime type' })
		}

		await pool.query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note])

		return res.status(201).json({ message: 'Note successfully created' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function getNotes(req, res, pool, next) {
	try {
		const [results] = await pool.query('SELECT * FROM notes')
		if (results.length === 0) {
			return res.status(404).json({ message: 'Notes empty' })
		}

		return res.status(200).json({ message: 'Notes successfully fetched', data: results })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function getNoteByID(req, res, pool, next) {
	try {
		const { id } = req.params

		if (validator.isEmpty(id)) {
			return res.status(400).json({ message: 'ID cannot be empty' })
		}

		if (!validator.isInt(id)) {
			return res.status(400).json({ message: 'ID must be number' })
		}

		const [result] = await pool.query('SELECT * FROM notes WHERE id = ?', [id])
		if (result.length === 0) {
			return res.status(404).json({ message: 'Note not found' })
		}

		return res.status(200).json({ message: 'Note successfully fetched', data: result })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function updateNote(req, res, pool, next) {
	try {
		const { id } = req.params
		const { title, datetime, note } = req.body

		if (validator.isEmpty(id) || validator.isEmpty(title) || validator.isEmpty(datetime) || validator.isEmpty(note)) {
			return res.status(400).json({ message: 'All fields cannot be empty' })
		}

		if (!validator.isInt(id)) {
			return res.status(400).json({ message: 'ID must be number' })
		}

		const [checkNotes] = await pool.query('SELECT * FROM notes WHERE id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Note not found' })
		}

		const [results] = await pool.query('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [
			title,
			datetime,
			note,
			id
		])
		if (results.affectedRows === 0) {
			return res.status(200).json({ message: 'No changes were made' })
		}

		return res.status(200).json({ message: 'Note successfully updated' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function deleteNote(req, res, pool, next) {
	try {
		const { id } = req.params

		if (validator.isEmpty(id)) {
			return res.status(400).json({ message: 'ID cannot be empty' })
		}

		if (!validator.isInt(id)) {
			return res.status(400).json({ message: 'ID must be number' })
		}

		const [checkNotes] = await pool.query('SELECT * FROM notes WHERE id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Note not found' })
		}

		const [result] = await pool.query('DELETE FROM notes WHERE id = ?', [id])
		if (result.affectedRows === 0) {
			return res.status(200).json({ message: 'No changes were made' })
		}

		return res.status(200).json({ message: 'Note successfully deleted' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

export { createNotes, getNotes, getNoteByID, updateNote, deleteNote }
