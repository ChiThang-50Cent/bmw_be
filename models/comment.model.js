const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.ObjectId, required: true },
    comments: {
        type: [{
            userId: { type: mongoose.Schema.ObjectId, required: true },
            comment: { type: String, required: true },
        }, ],
        required: true,
    },
});

module.exports = mongoose.model("Comments", commentSchema);