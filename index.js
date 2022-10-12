require('dotenv').config()
const express = require("express");
const app = express();
const { v4 } = require("uuid")
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

const { customers, products, invoices, contactforms} = require("./data/data.js")

// const productRouter = require('./routers/product');
// const customerRouter = require('./routers/customer');
// // const authRouter = require('./routers/authentication');
// const invoiceRouter = require('./routers/invoice')
// const contactRouter = require('./routers/contactForm')


app.use(bodyParser.json())

// app.use('/product', productRouter)
// app.use('/customer', customerRouter)
// // app.use('/membership', authRouter)
// app.use('/invoice', invoiceRouter)
// app.use('/contactForm', contactRouter)

app.get('/', (req, res) => {
  res.send('Welcome to Ying server!')
})

//List all
app.get("/customers",(req,res) => {
  res.json(customer);
})

app.get("/customers/:id",(req,res) =>{
  const user = customers.find((x) => x.id ===req.params.id);
  res.json(user);
})

//create one
app.post("customers/",(req,res) => {
  const {body} = req; 
  let newUser = {
    ...body,
    id: v4(),
  }; 
  customers.push(newUser);
  res.send(newUser);
}); 

// update one needss reoute parameter
app.put("/customers/:id", (req,res) => {
  const user = customers.find((x) =>x.id === req.params.id);
  const userIndex = customers.findIndex((x) => x.id === req.params.id);

  const{body} = req;
  let newUser = {
    ...user,
    ...body,
  };
  
  customers.splice(userIndex,1,newUser); 
  res.send(customers);
})


app.listen(port, () => {
 console.log(`Web server is listening on port http://localhost:${port}`);
});

