const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const ROLES = ["user", "admin", "moderator"];

const RolSchema = new Schema({
    name: String,

},{
    versionKey: false
});

module.exports = mongoose.model('rol', RolSchema);