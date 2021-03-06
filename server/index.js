require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())

const {getDateList, addDateList, randomList, deleteDateList, editDate, cheapList, mediumDate, PriceyDate} = require('./controller')

app.use(express.static(path.join(__dirname , '../public')))
app.use(express.static('node_modules'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'))
})

app.get('/dateList', getDateList)
app.get('/randomList', randomList)
app.get('/cheapList', cheapList)
app.get('/mediumDate', mediumDate)
app.get('/priceyDate', PriceyDate)
app.post('/dateListPost', addDateList)
app.put('/editDate/:id', editDate)
app.delete('/deleteDate/:id', deleteDateList)

const port = process.env.PORT || 4747

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})