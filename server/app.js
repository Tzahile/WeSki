const express = require('express')
const app = express()

app.use('/hotels', require('./routes/hotels'))

// app.use(express.static('public'))
app.listen(3000, () => console.log('Server running on port 3000'))