const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./todos.db", (err) => {
    if (err) {
        console.error("Database error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

// Creates table if it doesn't exist 
db.run(`
    CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
    )
`);

module.exports = db; 