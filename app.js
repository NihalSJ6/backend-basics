const express = require("express");
const morgan = require('morgan'); 
const app = express();
const userModel = require('./models/user')
const dbConnection = require('./config/db')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//third-party middleware
app.use(morgan('dev'))

//built-in middleware
app.use(express.static("public"))



app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.render("index");
});




app.post('/get-form-data', (req, res) => {
    console.log(req.body);
    res.send('data received');
})


app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', async(req, res) => {
  const { username, email, password } = req.body
  
  const userDetails = await userModel.create({
    username: username, 
    email: email,
    password: password,
  })

  res.send(userDetails)
})

app.get('/get-users', (req, res) => {
  userModel.find().then((users) => {
    res.send(users)
  })
})

app.get('/update-user', async (req, res) => {
  await userModel.findOneAndUpdate({
    username:"Nihal"
  }, {
    email: "nsj@gmail.com"
  })

  res.send("user updated")
})

app.get('/delete-user', async (req, res) => {
  await userModel.findOneAndDelete({
    email : "jastinihal@gmail.com"
  })

  res.send("user deleted")
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

