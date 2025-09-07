const jwt = require("jsonwebtoken");


function userMiddleware(req, res, next){
    const authHeader = req.headers['authorization'];
    
        if(!authHeader){
            return res.status(401).json({
                error: "No token provided"
            });
        }

        console.log(authHeader);
    
        const token = authHeader;
    
        if(!token) {
            return res.status(401).json({
                error: "No token found in your header"
            })
        }
    
        try {
            const decoded = jwt.verify(token, process.env.userSecretKey);
            req.userId = decoded.id;
            next();
        } catch(err){
            console.log(err);
            return res.status(403).json({
                error: "Malformed or expired token"
            })
        }

}

module.exports = ({
    userMiddleware: userMiddleware
});