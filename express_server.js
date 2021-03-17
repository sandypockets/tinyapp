const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');


const {generateRandomString, addNewURL, editURL, updatePath, updateLongURL, urlDatabase} = require('./helpers')

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



// ROUTES - GET
// .json of URLs for debugging
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

// List of URLs
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  console.log("A: ", templateVars);
  res.render("urls_index", templateVars);
});

// Page to create new URL
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// Display new shortURL
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  console.log(templateVars);
  res.render("urls_show", templateVars);
});

app.get("/urls/:shortURL/edit", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] }
  console.log("41", templateVars);
  res.render("urls_show", templateVars);
});

// ?????
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.render("urls_show");
});


// ROUTES - POST
// Create new shortURL
app.post("/urls", (req, res) => {
  const id = addNewURL(req.body.longURL);
  console.log(id);
  res.redirect(`/urls/${id}`);
});

// Delete existing shortURL
app.post("/urls/:shortURL/delete", (req, res) => {
  console.log("61");
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
});

// Reassign shortURL - V1
app.post("/urls/:id", (req, res) => {
  const shortURL = req.params.id;
  urlDatabase[shortURL] = req.body.newURL;
  res.redirect('/urls');
});

app.post("/urls/:shortURL/edit", (req, res) => {
  console.log("74");
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL] = req.body.longURL;
  console.log("shortURL", shortURL);
  console.log("req.body", req.body);
  res.redirect(`/urls/${shortURL}/edit`);
});

// Reassign shortURL - V2
/* app.post('/urls/:shortURL/edit', (req, res) => {
  // extract the quote id form the path
  // req.params
  const id = req.params.shortURL;
  console.log("ID: ", id);
  // extract the content for the form
  // req.body
  const longURL = req.body.shortURL;
  console.log("longURL: ", longURL);
  console.log("req.body:", req.body);
  //console.log("req", req);
  updateLongURL(id, longURL);
  // redirect to /quotes => no ejs, no template vars
  res.redirect(`/urls/${id}`);
}); */


// Server listening
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = urlDatabase;