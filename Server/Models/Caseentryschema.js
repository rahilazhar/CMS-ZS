const mongoose = require("mongoose");

const Caseentries = new mongoose.Schema(
  {
    NatureofSuit: {
        type: String,
        required: true
    },
    PlaintiffsBackground: {
        type: String,
        required: true
    },
    PlaintiffsClaim: {
        type: String,
        required: true
    },
    DefendantsArgument: {
        type: String,
        required: true
    },
    CurrentStatus: {
        type: String,
        required: true
    },
    PlaintiffsRepresentation: {
        type: String,
        required: true
    },
    Defendantrepresentative: {
        type: String,
        required: true
    },
    RestrainingOrder: {
        type: String,
        required: true
    },
    PlaintiffsSubmittedDocuments: {
        type: [String], 
        required: true
    },
    AdditionalPlaintiffDocuments: {
        type:[String], 
        required: true
    },
    DefendantsSubmittedDocuments: {
        type:[String],
        required: true
    },
    AdditionalDefendantDocuments: {
        type:[String],
        required: true
    },
    NoofWitnessesofPlaintiff: {
        type:String,
        required: true
    },
    NoofWitnessesofDefendant: {
        type:String,
        required: true
    },

    application:[
      {
        srNo: String,
        application: String,
        applicationDate: String,
        reply: String,
        replyDate: String,
    }
    ],

    filingOfSuit: {
      type: String,
      required: true
    },
    numberOfDefendants: {
      type: String,
      required: true
    },
    poaFilingDatePlaintiff: {
      type: String,
      required: true
    },
    poaFilingDateDefendant: {
      type: String,
      required: true
    },
    defendantsWrittenStatementDate: {
      type: String,
      required: true
    },
    issuesFramedDate: {
      type: String,
      required: true
    },
    restrainingOrderDate: {
      type: String,
      required: true
    },
    lastDateOfHearing: {
      type: String,
      required: true
    },
    nextDateOfHearing: {
      type: String,
      required: true
    },
    lawyer: {
      type: String,
      required: true
    },
    court: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
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