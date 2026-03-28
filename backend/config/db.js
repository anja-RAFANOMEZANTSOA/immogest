const mysql = require('mysql2');
require('dotenv').config();

let pool;

if (process.env.MYSQL_URL) {
  pool = mysql.createPool(process.env.MYSQL_URL);
} else {
  pool = mysql.createPool({
    host:             process.env.DB_HOST,
    port:             parseInt(process.env.DB_PORT) || 3306,
    user:             process.env.DB_USER,
    password:         process.env.DB_PASSWORD,
    database:         process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit:  10,
    queueLimit:       0
  });
}

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erreur connexion MySQL :', err.message);
  } else {
    console.log('MySQL connecté avec succès');
    connection.release();
  }
});

module.exports = pool.promise();