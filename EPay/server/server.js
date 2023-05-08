const express = require('express');
const cors = require('cors') 
const app = express();
const errorHandler = require('./middleware/error');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./config/mongoose.config');
require('./routes/user.route')(app);
app.use(errorHandler);

app.listen(8000, () => {
    console.log("Listening at port 8000");
})