//const urlDatabase = require('./express_server');

// Database of existing URLs
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// HELPER FUNCTIONS
function generateRandomString() {
  const randomString = Math.random().toString(26).substring(2, 8);
  return randomString;
};
  
const addNewURL = (longURL) => {
  const shortURL = generateRandomString();
  //const newShortURL = longURL;
  urlDatabase[shortURL] = longURL;
  return shortURL;
};

// TESTING
const editURL = (shortURL, longURL) => {
  const newShortURL = longURL;
  urlDatabase[shortURL] = newShortURL;
  return shortURL;
};
// TESTING

// Probably will not use this
const updatePath = (longURL) => {
  const id = urlDatabase.id;
  console.log(id);
  urlDatabase[id] = urlDatabase[id[longURL]];
  console.log(urlDatabase[id])
};

const updateLongURL = (shortURL, longURL) => {
  return urlDatabase[shortURL].longURL = longURL;
};

module.exports = {urlDatabase, generateRandomString, addNewURL, editURL, updatePath, updateLongURL};