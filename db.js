import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "note_app",
// });

// connection.query("SELECT * FROM `NOTES`", function (err, result, field) {
//   console.log(err);
//   console.log(result);
// });

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getNotes() {
  const [row] = await pool.query("SELECT * FROM NOTES");
  return row;
}

export async function getNoteById(id) {
  const [row] = await pool.query(`SELECT * FROM NOTES WHERE ID=?`, [id]);
  return row;
}

export async function createNote(title, content) {
  const [result] = await pool.query(
    `
  INSERT INTO NOTES (TITLE, CONTENTS) VALUES
  (?,?)
  `,
    [title, content]
  );
  const id = result.insertId;
  return getNoteById(id);
}

export async function updateNote(id, title, content) {
  const [result] = await pool.query(
    `
    UPDATE NOTES SET TITLE = ?, CONTENTS =? WHERE ID=?`,
    [title, content, id]
  );
  return getNoteById(id);
}

export async function deleteNote(id) {
  const [result] = await pool.query(`DELETE FROM NOTES WHERE ID=?`, [id]);
  return result;
}

// console.log(await updateNote(2, "EDITED TITLE", "EDITED CONTENTS"));

// const allNotes = await getNotes();
// const singleNote = await getNoteById(1);
// const insertNote = await createNote("FOURTH NOTE", "MAY THE 4TH BE WITH YOU!");
// console.log(insertNote);
