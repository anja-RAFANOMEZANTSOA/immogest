const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host:             process.env.DB_HOST,
  user:             process.env.DB_USER,
  password:         process.env.DB_PASSWORD,
  database:         process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:  10,
  queueLimit:       0
});

// Teste la connexion au démarrage
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erreur connexion MySQL :', err.message);
  } else {
    console.log('MySQL connecté avec succès');
    connection.release();
  }
});

module.exports = pool.promise();