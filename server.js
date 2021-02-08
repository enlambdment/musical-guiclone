// server.js
// Where the node app for this project starts.
// (i.e. observe how 'scripts.start' of the package.json
// has 'webpack && node server.js' -
// double ampersand '&&' says to run these 2 commands,
// launching webpack from cli & launching node app via server.js script,
// sequentially (vs. '&' which runs its 2 args concurrently)

// init project
const express = require('express')
const app = express() 

// What exactly is the role of Express here?