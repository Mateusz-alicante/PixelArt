const express = require('express')
const app = new express.Router()
const getEntries = require('../db/functions/geEntries')
const getEntry = require('../db/functions/getEntry')
const addEntry = require('../db/functions/addEntry')
const addComment = require('../db/functions/addComment')


// Put all API endpoints under '/api'
// app.get('/api/data/test', async (req, res) => {
//     res.send([{title: "Mi primer Pixelart", author: 'Pawel', image: response},{title: "Mi primer Pixelart", author: 'Pawel', image: response}, {title: "Mi primer Pixelart", author: 'Pawel', image: response}, {title: "Mi primer Pixelart", author: 'Pawel', image: response} ])
// });

app.get('/api/data', async (req, res) => {
  let cycle = parseInt(req.query.cycle)
  console.log(cycle)
  getEntries(cycle).then((e) => res.send(e))
})

app.get('/api/single', async (req, res) => {
  let entryID = req.query.id
  getEntry(entryID).then(e => res.send(e))
})

app.post('/api/new', async (req, res) => {
  try {
  addEntry(req.body).then(() => res.status(200).send('OK'))
  } catch {
    res.status(500).send('ERROR')
  }
})

app.post('/api/comment', async (req, res) => {
  try {
    await addComment(req.body)
    res.status(200).send('ok')
  } catch {
    res.status(500).send('ERROR')
  }
  
})

module.exports = app