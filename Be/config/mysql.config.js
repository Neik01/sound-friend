module.exports = {
  port: process.env.MYSQL_PORT,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  dialect: process.env.MYSQL_DIALECT,
  timezone: process.env.TIMEZONE, // for writing to database
}
