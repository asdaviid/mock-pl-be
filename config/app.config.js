module.exports = {
  jwtSecret: 'jwts3cr3t',
  jwtSession: { session: false },
  mongoUri: process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/mock-pl' : process.env.MONGO_URI
}