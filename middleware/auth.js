const jwt = require ('jsonwebtoken');
const dotenv = require ('dotenv');

dotenv.config()

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer', '').trim();
    if (!token || !token.length){
        return res.status(401).json({
            message: 'No token, acceso denegado'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error){
        res.status(401).json({
            message: 'Token invalido'
        })
    }
}

module.exports = { protect };