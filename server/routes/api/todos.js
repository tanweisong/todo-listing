const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

router.delete("/:id", async (req, res) => {
  let db = new sqlite3.Database("./database/Todos.db");

  db.run(`DELETE FROM todos WHERE id = ${req.params.id}`, function(err) {
    if (err) {
      throw err;
    } else {
      db.all("SELECT * FROM todos ORDER BY created_on ASC", [], (err, rows) => {
        if (err) {
          throw err;
        } else {
          res.send(rows);
        }
      });
    }
  });
});

router.get("/", async (req, res) => {
  let db = new sqlite3.Database("./database/Todos.db");
  let sql = "SELECT * FROM todos ORDER BY created_on ASC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

router.post("/", async (req, res) => {
  let db = new sqlite3.Database("./database/Todos.db");
  let name = req.body.name;
  let completed = req.body.completed;
  let created_on = req.body.created_on;

  let sql = `INSERT INTO todos(name, completed, created_on) VALUES ('${name}', ${completed}, ${created_on})`;
  db.run(sql, function(err) {
    if (err) {
      throw err;
    } else {
      sql = "SELECT * FROM todos ORDER BY created_on ASC";

      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        } else {
          res.send(rows);
        }
      });
    }
  });
  db.close();
});

router.put("/", async (req, res) => {
  let db = new sqlite3.Database("./database/Todos.db");
  let inTodos = req.body;

  for (let index = 0; index < inTodos.length; index++) {
    const todo = inTodos[index];
    const completed = todo.completed;
    const updated_on = todo.updated_on;
    const id = todo.id;

    db.run(
      `UPDATE todos SET completed = ${completed}, updated_on = ${updated_on} WHERE id = ${id}`,
      function(err) {
        if (err) {
          throw err;
        }
      }
    );
  }

  db.all("SELECT * FROM todos order by created_on ASC", [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
