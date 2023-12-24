const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log('Token:', token); // Log the token
        const decoded = jwt.verify(token, process.env.JWT_Key); // Ensure secret key matches
        req.user = { id: decoded.id };
        next();
    } catch (e) {
        console.error('Authentication error:', e.message); // Log the error
        res.status(401).send({ error: 'Session Expired Login Again' });
    }
};


const verifyToken = (req, res, next) => {
    // Extract the token from the 'Authorization' header
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
        return res.status(403).send({ message: 'No authorization header.' });
    }

    const token = authHeader.split(' ')[1]; // Split 'Bearer <token>'
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_Key, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role; // Assuming the token includes the user's role
        next();
    });
};



module.exports = {auth , verifyToken}



