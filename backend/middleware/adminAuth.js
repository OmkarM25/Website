// import jwt from "jsonwebtoken"

// const adminAuth = async (req, res, next) => {

//     try {

//         const { token } = req.headers;
//         if (!token) {
//             return res.json({ success: false, message: "Not Authorized, please login again" })
//         }

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({ success: false, message: "Not Authorized, please login again" })
//         }

//         next()


//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }

// }


// export default adminAuth



import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    // Extract token from Authorization header: "Bearer <token>"
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.json({ success: false, message: 'Not Authorized, please login again' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if email and role are correct
    if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== 'admin') {
      return res.json({ success: false, message: 'Not Authorized, please login again' });
    }

    // You can attach admin info to req if needed
    req.admin = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Not Authorized, please login again' });
  }
};

export default adminAuth;
