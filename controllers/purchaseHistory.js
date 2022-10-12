const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error"); // in order to use this line, you must have an error.js under sql folder

const getAllPurchaseHistory = (req, res) => {
  // SELECT ALL Address
  pool.query("SELECT * FROM Yingineering.purchase_history", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getPurchaseHistoryByID = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let id = req.params.id;
  let sql = "SELECT * FROM Yingineering.purchase_history WHERE id = ?"; // the "?" is what the user type in, the id here is the product catagory id number
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createPurchaseHistory = (req, res) => {
  let body = req.body; // this line basically request what's on the database and retreive the entire body of data.
  // INSERT INTO USERS FIRST AND LAST NAME
  let sql =
    "INSERT INTO Yingineering.purchase_history (id, invoice_number, customer_id, product_id, qty ) VALUES  (?,?,?,?,?); ";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [
    body.id,
    body.invoice_number,
    body.customer_id,
    body.product_id, body.qty,
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updatePurchasHistoryByID = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let body = req.body; // you must declare the body so that you can get the entire content of the CARS category
  let id = req.params.id; //specially get id from the request parameter

  let sql =
    "UPDATE Yingineering.purchase_history SET id = ?, invoice_number = ?, customer_id = ?, product_id, qty = ?,  WHERE id =?"; // id =? is the condition

  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [
    body.id,
    body.invoice_number,
    body.customer_id,
    body.product_id, body.qty,
    id,
  ]);
  //the reason why the id is last is b/c id = condition,
  // here we are using the body is b/c body is the content of the entire Product database, thus, we are using body.user_id, body.phone1, body.phone2, body.email

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

const deletePurchaseHistorybyID = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS invoice_number>
  let id = req.params.id; //specially get id from the request parameter
  let sql = "DELETE FROM Yingineering.purchase_history WHERE id = ?"; // id =? is the condition, Address is my database; if you are unsure, google delete mysql
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} product(s)` });
  });
};

module.exports = {
  getAllPurchaseHistory,
  getPurchaseHistoryByID,
  createPurchaseHistory,
  updatePurchasHistoryByID,
  deletePurchaseHistorybyID,
};
