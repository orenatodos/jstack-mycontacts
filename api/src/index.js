const express = require('express')

require('express-async-errors')

const router = require('./routes')

const app = express()

const PORT = 3001

app.use(express.json())
app.use(router)
app.use((error, req, res, next) => {
  console.log(error)

  return res.sendStatus(500)
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
