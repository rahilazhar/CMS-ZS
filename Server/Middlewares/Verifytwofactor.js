const Userschema = require('../Models/Userschema')
const { authenticator } = require('otplib');
const JWT = require('jsonwebtoken')


const verifyTwoFactorAuth = async (req, res) => {
    const { userId, twoFactorToken } = req.body;


    const user = await Userschema.findById(userId);

    if (!user) {
        return res.status(400).send('User not found');
    }

    const isVerified = authenticator.verify({ token: twoFactorToken, secret: user.twoFactorSecret });
    if (!isVerified) {
        return res.status(400).send('Invalid 2FA token');
    }

    const token = JWT.sign({ id: user._id, role: user.role }, process.env.JWT_Key, { expiresIn: '7d' });
    res.status(200).json({ Message: "Login" , id: user._id , token, role: user.role, email: user.email, picture: user.profilePicture });
};

module.exports = { verifyTwoFactorAuth }
