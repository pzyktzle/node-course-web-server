const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Whoops!',
//   });
// });

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to using hbs views'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About',
    aboutMessage: 'About this site'
  });
});

// app.get('/', (req, res) => {
//   // res.send('<h1>I will hunt Joni, I will find Joni, and I will kill Joni.<h1>')
//   res.send({
//     name: 'Adrian',
//     will: [
//       'hunt',
//       'find',
//       'kill'
//     ],
//     who: 'Joni',
//     dirname: __dirname
//   });
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
