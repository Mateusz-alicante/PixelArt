const mongoose = require('mongoose')
const Entry = require('../schemas/entrySchema')

const dateFormat = (ISO) => {
    date = new Date(ISO);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();

    if (dt < 10) {
    dt = '0' + dt;
    }
    if (month < 10) {
    month = '0' + month;
    }

    return(year+'-' + month + '-'+dt);
}

const getEntries = async (cycle) => {
    const entries = await Entry.find().sort({ _id: -1 }).skip(cycle * 15).limit(15)
    let data = entries.map(entry => ({title: entry.title, author: entry.author, date: dateFormat(entry.date), image: entry.image}))

    return {hasMore: data.length == 15, data}
}

module.exports = getEntries