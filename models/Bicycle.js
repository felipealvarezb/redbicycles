const mongoose = require('mongoose');
const bicycleSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    location: {
        type: {
          type: String,
          enum: ['Point'], 
          required: true,
        },
        coordinates: {
          type: [Number], 
          required: true,
        },
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Bicycle", bicycleSchema);