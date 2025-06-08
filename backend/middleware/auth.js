import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    let token;
  
    // Get token from Authorization header (format: "Bearer <token>")
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return res.json({ success: false, message: 'Not Authorized Login Again' });
    }
  
    try {
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = token_decode.id;
      next();
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

export default authUser