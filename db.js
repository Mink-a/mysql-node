import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "notes_db",
// });

// connection.query("SELECT * FROM `Notes`", function (err, result, field) {
//   console.log(err);
//   console.log(result);
// });

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "notes_db",
  })
  .promise();

export async function getNotes() {
  const [row] = await pool.query("SELECT * FROM Notes");
  return row;
}

export async function getNoteById(id) {
  const [row] = await pool.query(`SELECT * FROM Notes WHERE id=?`, [id]);
  return row;
}

export async function createNote(title, content) {
  const [result] = await pool.query(
    `
  INSERT INTO Notes (title, contents) VALUES
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
    UPDATE Notes SET title = ?, contents =? WHERE id=?`,
    [title, content, id]
  );
  return getNoteById(id);
}

export async function deleteNote(id) {
  const [result] = await pool.query(`DELETE FROM Notes WHERE id=?`, [id]);
  return result;
}

// console.log(await updateNote(2, "EDITED title", "EDITED contents"));

// const allNotes = await getNotes();
// const singleNote = await getNoteById(1);
// const insertNote = await createNote("FOURTH NOTE", "MAY THE 4TH BE WITH YOU!");
// console.log(allNotes);
