import mysql from 'mysql2';

export class DBService {
  static async queryTessieTrackerDB() {
    // TODO add parameter for query
    try {
      console.log('Start getFromDb');

      // create the connection to database
      const connection = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        port: 3306,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
      });

      // TODO create proper DB service
      connection.execute('SELECT * FROM users', (err, results) => {
        console.log(results);
        if (err) {
          console.error(err);
        }
      });
    } catch (error) {
      console.error('ERROR:', error);
    }
  }
}
