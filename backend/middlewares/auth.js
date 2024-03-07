const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const authHeader = req.headers['authorization'];
       console.log(authHeader);
       if (!authHeader) {
           throw new Error('Authorization header is missing');
       }
       const token = authHeader.split(' ')[1]; // Assuming format is Bearer <token>
       const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
       next();
   } catch(error) {
       res.status(401).json({ error: error.message });
   }
};