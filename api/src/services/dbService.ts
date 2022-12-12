import mysql from 'mysql2/promise';

export class DBService {
  static async queryTessieTrackerDB(query: string, preparedStatements?: string[]) {
    try {
      // TODO rework logic of getting credentials
      const connection = await mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        port: 3306,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
      });

      const [rows] = await connection.query(query, preparedStatements);
      return rows;
    } catch (error) {
      throw new Error(error);
    }
  }
}
