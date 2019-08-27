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

const getEntry = async (id) => {
    const entry = await Entry.findById(id)
    const result = {info: {
        title: entry.title, 
        author: entry.author, 
        date: dateFormat(entry.date)
    },image: {
        data: entry.image
    }, comments: [...entry.comments]
}

return result
}

module.exports = getEntry