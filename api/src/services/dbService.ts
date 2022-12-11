import mysql from 'mysql2';

export class DBService {
  static async getFromDb() {
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

      const result = connection.execute('SELECT * FROM users');

      console.log('RESULT:', result);
    } catch (error) {
      console.error('ERROR:', error);
    }
  }
}
