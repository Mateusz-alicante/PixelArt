const mongoose = require('mongoose')
const Entry = require('../schemas/entrySchema')



const addComment = async (body) => {
    let entry = await Entry.findByIdAndDelete(body.entryID)

    var updatedEntry = entry.toObject();
    // delete updatedEntry._id;

    if (updatedEntry.comments) {
        updatedEntry.comments.push({
            CommentId: mongoose.Types.ObjectId(),
            name: body.name,
            message: body.message
        })
    } else {
        updatedEntry.comments = [{
            CommentId: mongoose.Types.ObjectId(),
            name: body.name,
            message: body.message
        }
        ]
    }

        const newEntry = await Entry.updateOne({_id: body.entryID}, {...updatedEntry}, {upsert: true});
        return newEntry
}

module.exports = addComment