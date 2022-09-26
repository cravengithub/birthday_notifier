import express from 'express'
import cors from 'cors'
import user from './api/user.route.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/user", user)
app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' })
})
export default app