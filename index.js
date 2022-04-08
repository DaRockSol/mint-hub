const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);

const MintRoutes = require('./hubFunc/hubFunc')

app.use('/api/minthub/mintfunc', MintRoutes)

httpServer.listen(8080, () => console.log("Do I detect a hint of minty freshness??? *COUGH*"));
