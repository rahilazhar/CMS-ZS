const Userschema = require('../Models/Userschema')
const Admincontrollschema = require('../Models/Admincontroller')
const bcrypt = require('bcrypt');




const Getallusers = async (req, res) => {

    const userId = req.params.id;

    if (userId) {
        try {
            const users = await Userschema.findById(userId)
            if (users) {
                return res.status(200).send(users)
            } else {
                return res.status(404).send({ Message: "Entry Not Found" });
            }
        } catch (error) {
            return res.status(400).send({ Message: "Invalid ID Format" });
        }

    } else {
        const getallusers = await Userschema.find()
        res.status(200).send(getallusers)
    }

}


const Addrole = async (req, res) => {
    const { role } = req.body;

    if (!role) {
        return res.send({ Message: "Assign the role first" });
    }

    try {
        // Find the Admin document. If it doesn't exist, create it.
        const adminControl = await Admincontrollschema.findOneAndUpdate(
            {},
            { $push: { role: role } },
            { new: true, upsert: true }
        );

        if (adminControl) {
            return res.send({ Message: "Role added successfully" });
        } else {
            return res.send({ Message: "Error in adding role" });
        }
    } catch (error) {
        return res.status(500).send({ Message: "Server error", error: error });
    }
}


const Getrole = async (req, res) => {
    const getuser = await Admincontrollschema.find()

    if (getuser.length > 0) {
        return res.send(getuser)
    } else {
        return res.send({ Message: "No Role Found" })
    }
}



// const UserEdit = async (req, res) => {
//     let updateData;
//     if (req.file) {
//         updateData = { $set: { ...req.body, profilePicture: req.file.path } };
//     } else {
//         updateData = { $set: { ...req.body } };
//     }

//     let result = await Userschema.updateOne(
//         { _id: req.params.id },
//         updateData,
//         { upsert: true }  // upsert: true will insert a new document if no existing document match the filter.
//     );
//     res.send(result);
// };

const UserEdit = async (req, res) => {
    let updateData = { ...req.body };

    // Check if the password is being updated
    // Hash the new password only if it's provided and not empty
    if (updateData.password && updateData.password.trim() !== '') {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
        delete updateData.password; // Remove password from updateData if it's not being changed
    }
    // Check for profile picture update
    if (req.file) {
        updateData.profilePicture = req.file.path;
    }

    try {
        let result = await Userschema.updateOne(
            { _id: req.params.id },
            { $set: updateData },
            { upsert: true } // upsert: true will insert a new document if no existing document match the filter.
        );
        res.status(200).send({Message:"Update Successfully" , result});
    } catch (error) {
        // Handle any errors that occur during update
        res.status(500).send({ message: "Error updating user", error: error.message });
    }
};





module.exports = { Getallusers, Addrole, Getrole, UserEdit }