const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

// for bcrypt
const saltRounds = 10;

const signup = (req, res) => {
  const { user_name, password } = req.body;
  let sql = "INSERT INTO membership (user_name, password) VALUES (?, ?)";

  bcrypt.hash(password, saltRounds, (err, hash) => {
    sql = mysql.format(sql, [user_name, hash]);

    pool.query(sql, (err, result) => {
      if (err) {
        // if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('Username is taken')
        return handleSQLError(res, err);
      }
      return res.send("Sign-up successful");
    });
  });
};

const login = (req, res) => {
  const {password, user_name} = req.body
  let sql = "SELECT * FROM membership WHERE user_name = ?";

  sql = mysql.format(sql, [user_name]);
  // sql becomes "SELECT * FROM membership WHERE username = "Hello";"

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    if (rows.length === 0) return res.status(404).send("No matching users");

    const hash = rows[0].password;
    bcrypt.compare(password, hash).then((result) => {
      if (!result) return res.status(400).send("Invalid password");

      const data = { ...rows[0] };
      data.password = "REDACTED";

      const token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({
        msg: "Login successful",
        token,
      });
    });
  });
};

module.exports = {
  signup,
  login,
};