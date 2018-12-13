module.exports = {
  database: process.env.NODE_ENV === 'development' ? 'mock-pl-be' : process.env.DB_NAME,
  username: process.env.NODE_ENV === 'development' ? 'mock-pl-be' : process.env.DB_USERNAME,
  password: process.env.NODE_ENV === 'development' ? 'mock-pl-be' : process.env.DB_PASSWORD,
  host: process.env.NODE_ENV === 'development' ? '127.0.0.1' : process.env.DB_HOST,
  dialect: 'mysql'
}