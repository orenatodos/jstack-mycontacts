const express = require('express')

require('express-async-errors')

const cors = require('./app/middlewares/cors')
const errorHandler = require('./app/middlewares/errorHandler')

const router = require('./routes')

const app = express()

const PORT = 3001

app.use(express.json())
app.use(cors)
app.use(router)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
