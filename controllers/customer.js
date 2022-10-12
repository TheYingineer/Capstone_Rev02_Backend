const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error"); // in order to use this line, you must have an error.js under sql folder

const getAllCustomer = (req, res) => {
  // SELECT ALL Address
  pool.query("SELECT * FROM Yingineering.customer", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getCustomerById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let id = req.params.id;
  let sql = "SELECT * FROM Yingineering.customer WHERE ID = ?"; // the "?" is what the user type in
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createCustomer = (req, res) => {
  let body = req.body; // this line basically request what's on the database and retreive the entire body of data.
  // INSERT INTO USERS FIRST AND LAST NAME
  let sql =
    "INSERT INTO Yingineering.customer (customer_id, first_name, last_name, phone_number, address, city, state, zipcode, email) VALUES  (?,?,?,?,?,?,?,?,?); ";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [body.customer_id, body.first_name, body.last_name, body.phone_number, body.address, body.city, body.state, body.email]); // entire body of data from user_id, address, city, county, state and zip

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updateCustomerById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let body = req.body; // you must declare the body so that you can get the entire content of the CARS category
  let id = req.params.id; //specially get id from the request parameter

  let sql =
    "UPDATE Yingineering.customer SET customer_id = ?, first_name = ?, last_name = ?, phone_number = ?, address = ?, city = ?, state = ?, zipcode =?, email=?, WHERE id =?"; // id =? is the condition

  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [
    body.customer_id, body.first_name, body.last_name, body.phone_number, body.address, body.city, body.state, body.email,
    id ]);
  //the reason why the id is last is b/c id = condition,
  // here we are using the body is b/c body is the content of the entire Customer database, thus, we are using body.user_id, body.phone1, body.phone2, body.email

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

const deleteCustomerById = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let id = req.params.id; //specially get id from the request parameter
  let sql = "DELETE FROM Yingineering.customer WHERE id = ?"; // id =? is the condition, Address is my database; if you are unsure, google delete mysql
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} customer(s)` });
  });
};

module.exports = {
  getAllCustomer,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
};
