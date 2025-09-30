const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    opponent: { type: String, 
                required: true 
    },
    date: { type: Date, 
            required: true 
    },
    time: String,
});

module.exports = mongoose.model ('Match', matchSchema);