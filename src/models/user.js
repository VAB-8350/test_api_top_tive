const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    roles:[{
        ref: "rol",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

UserSchema.statics.comparePassword = async (password, receivePassword) => {
    return await bcrypt.compare(password, receivePassword);
}

module.exports = mongoose.model('user', UserSchema);