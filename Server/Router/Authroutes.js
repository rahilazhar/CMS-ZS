const express = require('express')
const { Caseentries, Getentries, gettodayhearings, updateschema, deleteHistoryEntry, Gethistory, GetTodayEntries, Factsheetcontroller, getFactsheetByCaseentryId, Getentriesonthebaseofid, updateFactsheetByCaseentryId, deleteCaseEntry, getCaseBySuitno, Editallentries, RequestEdit, Approvedrequest, ListPendingEditRequests, UpdateRequestStatus } = require('../Controllers/Entriescontroller')
const { UserRegistration, logincontroller, GetRoleUsers } = require('../Controllers/Authcontroller')
const { auth, verifyToken } = require('../Middlewares/Verification')
const { Editrequestget } = require('../Controllers/AdminController')
const { Getallusers, Addrole, Getrole, UserEdit } = require('../Controllers/Usercontroller')
const path = require("path");
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const multer = require('multer')


const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }

})

const upload = multer({ storage: storage })
const upload1 = multer({ dest: 'uploads/' });
const upload2 = multer({ dest: 'uploads/' });


// ok
const router = express.Router()

// Auth controllers
router.post('/registration', upload.single('profilePicture'), UserRegistration)
router.post('/login', logincontroller)

// Case Routes
router.post('/entries', upload.single('wordFile'), Caseentries)

router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    // Set proper headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf'); // Set the appropriate content type for your file

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
});


router.get('/downloadWord/:filename', (req, res) => {
    const filename = req.params.filename;
    try {
        const filePath = path.join(__dirname, 'uploads', filename);

        // Set the response headers for file download
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/getentries/:id?', Getentries);
router.put('/editentries/:id', auth, upload.single('wordFile'), Editallentries)
router.post('/reqedit/:id', auth, RequestEdit)
router.post('/approvedreq/:userId', Approvedrequest)
router.get('/pendingrequests', ListPendingEditRequests)
router.post('/updaterequest/:id', UpdateRequestStatus) // A general route for both approval and rejection
router.get('/editreqget', Editrequestget)
router.get('/getentriesid/:id', Getentriesonthebaseofid)
router.get('/gettodayentries', GetTodayEntries)
router.delete('/deleteentries/:id', deleteCaseEntry)

// Factsheetroutes
router.post('/factsheet/:caseentryId', Factsheetcontroller)
router.get('/factsheet/caseentry/:caseentryId', getFactsheetByCaseentryId)
router.put('/editfactsheet/:caseentryId', updateFactsheetByCaseentryId)

// history routes
router.put('/updateschema/:id', updateschema)
router.delete('/caseentries/:caseId/history/:historyId', deleteHistoryEntry); // Route for deleting history entry
router.get('/gethistory/:caseId', Gethistory)


router.get('/gettodayhearings', gettodayhearings)


// Users Routes
router.get('/getallusers/:id?', Getallusers)
router.get('/getusersonrole', verifyToken, GetRoleUsers)
router.put('/editusers/:id', upload1.single('profilePicture'), UserEdit)
router.post('/addrole', Addrole)
router.get('/getrole', Getrole)


module.exports = router