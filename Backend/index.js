// This group of code creates a server called 'app'
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
    console.log('/todos was Accessed');

    db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.post("/todos", (req, res) => {
    const { name } = req.body;

    const callback = function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name });
    };

    db.run("INSERT INTO todos (name) VALUES (?)", [name], callback);
});

app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    db.run(
        "UPDATE todos SET name = ? WHERE id = ?",
        [name, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ id, name });
        }
    );
});

// Section that allows us to delete a data input
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM TODOS WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.change === 0) { //SQLite tells us if anything was deleted
                return res.status(404).json({ message: "Todo not found" });
            }

            res.json({ message: "todo deleted", id });
        }
    );
});


app.put("/todos/:id", (req, res) => {
    const { completed } = req.body;
    const { id } = req.params;

    db.run(
        "UPDATE todos SET completed = ? WHERE id = ?",
        [completed, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message});
            }
            res.json({ updated: this.changes });
        }
    );
});

// Server start switch
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});