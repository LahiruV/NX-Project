const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User; 