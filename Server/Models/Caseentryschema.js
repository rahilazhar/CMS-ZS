const mongoose = require("mongoose");

const Caseentries = new mongoose.Schema(
    {
        Suitno: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        nature: {
            type: String,
            required: true
        },
        prevhearing: {
            type: String,
            required: true
        },
        nexthearing: {
            type: String,
            required: true
        },
        factsheet: {
            type: String,
            required: true
        },
        progressreport: {
            type: String,
            required: true
        },

        isEditApproved: {
            type: Boolean,
            default: false
        },

       
       
        
        history: [ // Initialize history as an empty array
            {
                date: String,
                proceedings: String
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Caseentries", Caseentries);