import mysql, { FieldPacket, OkPacket } from 'mysql2/promise';
import { UserData } from '../models/userManagement';

export class TessieTrackerDBService {
  static async queryUsersTable(query: string, preparedStatements?: string[]) {
    try {
      // TODO rework logic of getting credentials
      const connection = await mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        port: 3306,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
      });

      const [rows]: [UserData[], FieldPacket[]] = await connection.query<UserData[]>(query, preparedStatements);
      return rows;
    } catch (error) {
      throw new Error(error);
    }
  }
}
