const jwt = require("jsonwebtoken");


function userMiddleware(req, res, next){
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({
            error: "No token provided"
        });
    }

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(404).json({
            error: "No token found in your header"
        })
    }

    const decoded = jwt.verify(token, process.env.userSecretKey, (err, user) => {
        error: "Malformed token"
    });

    if(decoded){
        req.userId = decoded.id;
        next();
    } else {
        return res.status(403).json({
            error: "You are not signed in"
        })
    }

}

module.exports = ({
    userMiddleware: userMiddleware
});