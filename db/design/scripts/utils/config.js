require('dotenv').config()

const nano = require('nano')(process.env.COUCHDB_URL || 'http://admin:password@localhost:5984')
const dbname = process.env.COUCHDB_DBNAME || 'xpense'

module.exports = {
  nano,
  dbname
}