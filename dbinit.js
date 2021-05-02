const { Pool } = require('pg')

const pool = new Pool()

module.exports = {
<<<<<<< HEAD
    query: (text, params) => pool.query(text, params)
=======
  query: (text, params) => pool.query(text, params)
>>>>>>> 95394d8f1eb2e56d2480cf877f86bda349d3ecfe
}