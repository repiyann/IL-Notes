import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import notesRouters from './src/routes/notes.route.js'

const app = express()
const PORT = process.env.APP_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Internal Server Error')
})

app.use('/api', notesRouters)

app.listen(PORT, () => {
  console.log(`Berhasil jalan di ${PORT}`)
})