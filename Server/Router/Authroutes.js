const express = require('express')
const { Caseentries, Getentries, gettodayhearings, updateschema, deleteHistoryEntry, Gethistory, GetTodayEntries, Factsheetcontroller, getFactsheetByCaseentryId, Getentriesonthebaseofid, updateFactsheetByCaseentryId, deleteCaseEntry, getCaseBySuitno, Editallentries, RequestEdit, Approvedrequest, ListPendingEditRequests, UpdateRequestStatus } = require('../Controllers/Entriescontroller')
const { UserRegistration, logincontroller, GetRoleUsers } = require('../Controllers/Authcontroller')
const { auth, verifyToken } = require('../Middlewares/Verification')
const { Editrequestget } = require('../Controllers/AdminController')
const { Getallusers, Addrole, Getrole, UserEdit } = require('../Controllers/Usercontroller')
const path = require("path");
const multer = require('multer')
const { enableTwoFactorAuth } = require('../Controllers/Twofactor')
const {verifyTwoFactorAuth} = require('../Middlewares/Verifytwofactor')


const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }

})

const upload = multer({ storage: storage })
const upload1 = multer({ dest: 'uploads' });


// ok
const router = express.Router()

// Auth controllers
router.post('/registration', upload.single('profilePicture'), UserRegistration)
router.post('/login', logincontroller)






router.get('/downloadWord/:filename', (req, res) => {
    const filename = req.params.filename;
    try {
        const filePath = path.join(__dirname, '..',  'uploads', filename);


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



//Add  Case Routes  (Done)
router.post('/entries', upload.single('wordFile'), Caseentries) 

// Get all the and on the base of id if id gives on the end then get on id and if not provide id then get all the cases (Done)
router.get('/getentries/:id?', Getentries);

// Edit Entries Route with picture
router.put('/editentries/:id', auth, upload.single('wordFile'), Editallentries)

// Req approve pending and update routes
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
router.post('/enable-2fa/:id', enableTwoFactorAuth);
router.post('/verify-2fa', verifyTwoFactorAuth);



module.exports = router