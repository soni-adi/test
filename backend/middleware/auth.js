const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Cookie-only authentication. We intentionally do NOT accept tokens via the
// Authorization header — httpOnly cookies can't be read by client-side JS,
// which closes off a common XSS-token-theft vector. All requests must come
// from the browser with credentials, scoped by CORS to CLIENT_URL.
module.exports = { authenticate: async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId).select('-password -otp -refreshTokens');
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user; next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    res.status(401).json({ error: 'Invalid token' });
  }
}};
