const express = require('express');
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes');


const app = express();
const PORT = process.env.PORT || 3001;


//setup the Express app ti handle data parsing
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use("/api", apiRoutes)
app.use("/", htmlRoutes)

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });