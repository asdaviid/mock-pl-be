module.exports = {
  jwtSecret: 'jwts3cr3t',
  jwtSession: { session: false },
  mongoUri: process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/mock-pl' : process.env.MONGO_URI,
  database: process.env.NODE_ENV === 'development' ? 'mock-pl-be' : process.env.DB_NAME,
  username: process.env.NODE_ENV === 'development' ? 'mock-pl-be' : process.env.DB_USERNAME,
  password: process.env.NODE_ENV === 'development' ? 'mock-pl-be' : process.env.DB_PASSWORD,
  host: process.env.NODE_ENV === 'development' ? '127.0.0.1' : process.env.DB_HOST,
  dialect: 'mysql'
}