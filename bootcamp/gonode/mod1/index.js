const express = require('express')
const app = express()

const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  // folder that contains the views
  autoescape: true, //
  express: app, // our express server
  watch: true // serves like a Nodemon for Nunjucks, updates automatically
})
// Sets global configurations
app.set('view engine', 'njk') // setting wich view engine to use: njk
app.use(express.urlencoded({ extended: false })) // tells express to encode url in our form

//! Middleware: intercepts requisitions and can return a response
// const logMiddleWare = (req, res, next) => {
//   console.log(
//     `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
//   );
//   req.appName = "GoNode!"; //*Added variable to req, so any middleware that executes after this one can use that variable.
//   return next(); //! next: avoid blocking flux requisition, console.log and then free the way, without this the page keeps updating
// };

//! Tells all routes to use our logMiddleware
// app.use(logMiddleWare);

// app.get("/", (req, res) => {
//   return res.send(`${req.appName} ${req.query.name}`);
// });

// app.get("/name/:name", (req, res) => {
//   return res.json({ name: req.params.name });
// });

const users = ['Breno Rios', 'Benício Rios', 'Celaine Rios']

app.get('/', (req, res) => {
  return res.render('list', { users }) // list: view file, {}: object containing variables to bind
})

app.get('/new', (req, res) => {
  return res.render('new', { users }) // list: view file, {}: object containing variables to bind
})

app.post('/create', (req, res) => {
  users.push(req.body.user) // adds new user to users list
  return res.redirect('/')
})

app.listen(3000)
