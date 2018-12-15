module.exports = {
  jwtSecret: 'jwts3cr3t',
  jwtSession: { session: false },
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mock-pl'
}