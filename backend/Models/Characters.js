const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    race: {
        type: String,
        required: true
    },
    powerLevel: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
