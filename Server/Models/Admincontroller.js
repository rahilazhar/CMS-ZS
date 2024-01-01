const mongoose = require("mongoose")

const Admincontrollschema = new mongoose.Schema(
    {
        role:{
            type:[String],
        }

       


},{timestamps: true})

module.exports = mongoose.model('Admin' , Admincontrollschema )