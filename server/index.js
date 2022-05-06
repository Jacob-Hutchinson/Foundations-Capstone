require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const {SERVER_PORT} = process.env

const app = express()

app.use(express.json())
app.use(cors())

const {getDateList, addDateList, randomList, deleteDateList, editDate} = require('./controller')

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.get('/dateList', getDateList)
app.get('/randomList', randomList)
app.post('/dateListPost', addDateList)
app.put('/editDate/:id', editDate)
app.delete('/deleteDate/:id', deleteDateList)

const port = process.env.PORT || 4747

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})