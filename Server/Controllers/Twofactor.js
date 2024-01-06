const { authenticator } = require('otplib');
const QRCode = require('qrcode');
const Userschema = require('../Models/Userschema')



const enableTwoFactorAuth = async (req, res) => {
    const userId = req.params.id; // Assuming you have the user's ID from the session or token
    const user = await Userschema.findById(userId);

    if (!user) {
        return res.status(404).send('User not found');
    }

    // Generate a 2FA secret
    const secret = authenticator.generateSecret();

    // Save the secret to the user's account in the database
    user.twoFactorSecret = secret;
    user.isTwoFactorEnabled = true;
    await user.save();

    // Generate a QR Code
    const otpauth = authenticator.keyuri(user._id, 'Zia&Shah Legal Consultants', secret);
    QRCode.toDataURL(otpauth, function (err, imageUrl) {
        if (err) {
            return res.status(500).send('Error generating QR Code');
        }
        res.status(200).json({ imageUrl, message: '2FA is enabled. Scan QR Code with Google Authenticator.' });
    });
};

module.exports = { enableTwoFactorAuth }
