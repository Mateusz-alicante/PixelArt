const express = require('express')
const app = new express.Router()
const getEntries = require('../db/functions/geEntries')
const addEntry = require('../db/functions/addEntry')


// Put all API endpoints under '/api'
// app.get('/api/data/test', async (req, res) => {
//     res.send([{title: "Mi primer Pixelart", author: 'Pawel', image: response},{title: "Mi primer Pixelart", author: 'Pawel', image: response}, {title: "Mi primer Pixelart", author: 'Pawel', image: response}, {title: "Mi primer Pixelart", author: 'Pawel', image: response} ])
// });

app.get('/api/data', async (req, res) => {
  let cycle = parseInt(req.query.cycle)
  getEntries(cycle).then((e) => res.send(e))
})

app.post('/api/new', async (req, res) => {
  try {
  addEntry(req.body).then(() => res.status(200).send('OK'))
  } catch {
    res.status(500).send('ERROR')
  }
})

module.exports = app