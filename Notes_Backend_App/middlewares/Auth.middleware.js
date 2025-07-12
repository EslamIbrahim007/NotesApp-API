import  jwt  from 'jsonwebtoken';

// Middleware to check if the user is authenticated
export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {


    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Attach user information to the request object
    req.user = {
      _id: decoded.id || decoded._id, // ensure _id is available
      email: decoded.email,
      role: decoded.role,
    };

    next();
  });
};
// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
