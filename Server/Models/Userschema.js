const mongoose = require("mongoose")

const Userschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
        },

        profilePicture: {
            type: String,
        },

        // role: {
        //     type: String,
        //     enum: ['admin', 'user'],
        //     default: 'user'
        // },

        isUserApproved: {
            type: Boolean,
            default: false
        },

        // In your Userschema
        isTwoFactorEnabled: { type: Boolean, default: false },
        twoFactorSecret: String,





    }, { timestamps: true })

module.exports = mongoose.model('users', Userschema)