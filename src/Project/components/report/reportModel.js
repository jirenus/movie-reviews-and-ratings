const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    userId: String,
    username: String,
    message: String
});

const report = mongoose.model('report', reportSchema);

module.exports = report;