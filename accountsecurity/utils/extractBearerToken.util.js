 export function extractToken(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return false;
  };
  if (!authHeader.startsWith('Bearer ')) {
    return false;
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return false;
  }
  return parts[1];
};