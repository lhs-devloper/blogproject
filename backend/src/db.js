import mysql from 'mysql';
import dotenv from 'dotenv';

export const option = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: 'zxqw#20172405',
    database: process.env.DB_NAME
}

const connection = mysql.createConnection(option)

connection.connect(
    (err) => {
        if (err) {
            console.error(err.stack);
        }
        else {
            console.log('DB Connected... ✔');
        }
    }
);

export default connection;