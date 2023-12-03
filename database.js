import ejs from "ejs";
import mysql from "mysql2/promise";


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'v45w9d',
    database: 'school_library'
});
 
export const showData = async () => {
    const [rows, fields] = await pool.query('SELECT * FROM student');
    return rows;
};

export const singlePerson = async (id) => {
    const [row, fields] = await pool.query("SELECT * FROM student WHERE id = ?;", [id])
    return row;
}

export const addData = async (oStudent) => {
    const [rows, fields] = await pool.query(
        'INSERT INTO student (stud_name, class1, book_name, book_isbn, book_author, borrowed_date, return_date) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [oStudent.stud_name, oStudent.class1, oStudent.book_name, oStudent.book_isbn, oStudent.book_author, oStudent.borrowed_date, oStudent.return_date]
    );
};

export const deleteData = async (id) => {
    const [rows, fields] = await pool.query(
        'DELETE FROM student WHERE id = ?;',
        [id]
    )
};

export const updateData = async (studName, className, bookName, bookISBN, author, borrowedDate, returnDate, id) => {
    const [rows, fields] = await pool.query(
      'UPDATE student SET stud_name = ?, class = ?, book_name = ?, book_author=?, book_isbn = ?, borrowed_date = ?, return_date = ? WHERE id = ?',
      [studName, className, bookName, author, bookISBN, borrowedDate, returnDate, id]
    );
  };
  






