const mongoose = require ('mongoose')

const newsSchema = new mongoose.Schema({
    title: { type: String,
            required: true
    },
    date: { type: Date,
            default: Date.now
    },
    content: String,
})

module.exports = mongoose.model ('News', newsSchema);