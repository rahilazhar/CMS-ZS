const mongoose = require("mongoose");

const Caseentries = new mongoose.Schema(
  {
    NatureofSuit: {
      type: String,
      required: false
    },
    PlaintiffsBackground: {
      type: String,
      required: false
    },
    PlaintiffsClaim: {
      type: String,
      required: false
    },
    DefendantsArgument: {
      type: String,
      required: false
    },
    CurrentStatus: {
      type: String,
      required: false
    },
    PlaintiffsRepresentation: {
      type: String,
      required: false
    },
    Defendantrepresentative: {
      type: String,
      required: false
    },
    RestrainingOrder: {
      type: String,
      required: false
    },
    PlaintiffsSubmittedDocuments: {
      type: [String],
      required: false
    },
    AdditionalPlaintiffDocuments: {
      type: [String],
      required: false
    },
    DefendantsSubmittedDocuments: {
      type: [String],
      required: false
    },
    AdditionalDefendantDocuments: {
      type: [String],
      required: false
    },
    NoofWitnessesofPlaintiff: {
      type: String,
      required: false
    },
    NoofWitnessesofDefendant: {
      type: String,
      required: false
    },

    application: [
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
      required: false
    },
    numberOfDefendants: {
      type: String,
      required: false
    },
    poaFilingDatePlaintiff: {
      type: String,
      required: false
    },
    poaFilingDateDefendant: {
      type: String,
      required: false
    },
    defendantsWrittenStatementDate: {
      type: String,
      required: false
    },
    issuesFramedDate: {
      type: String,
      required: false
    },
    restrainingOrderDate: {
      type: String,
      required: false
    },
    prevhearing: {
      type: String,
      required: false
    },
    nexthearing: {
      type: String,
      required: false
    },
    lawyer: {
      type: String,
      required: false
    },
    Clientname: {
      type: String,
      // required: false
    },
    court: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    Suitno: {
      type: String,
      required: true
    },
    Valueofsuit: {
      type: String,
      required: false
    },
    wordFilePath: {
      type: String,
      required: false
    },

    isEditApproved:{
      type:Boolean,
      default:false
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