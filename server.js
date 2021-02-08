// server.js
// Where the node app for this project starts.
// (i.e. observe how 'scripts.start' of the package.json
// has 'webpack && node server.js' -
// double ampersand '&&' says to run these 2 commands,
// launching webpack from cli & launching node app via server.js script,
// sequentially (vs. '&' which runs its 2 args concurrently)

// init project
const express = require('express')

// Creates an Express app.
const app = express() 

// When the app GETs the route specified in the 1st param,
// here just '/', then it should carry out the callback
// process specified in the 2nd param.
// Here, our callback is a process that is totally indifferent
// to the type / contents of the request, and just serves back
// the generated & bundle-injected version of our original
// index.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/dist/index.html')
})

// Listen for requests.
// (Otherwise, there will never be an occasion for the 
// callback to be run, because the above instruction just
// sets up the callback as an asynchronous process)
const listener = app.listen(
  process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)})