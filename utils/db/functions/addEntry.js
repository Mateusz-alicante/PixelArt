const mongoose = require('mongoose')
const Entry = require('../schemas/entrySchema')



const addEntry = async (body) => {
    let entry = new Entry({title: body.title, author: body.author, image: body.image})
    await entry.save()
    console.log('saved to db')
}

module.exports = addEntry