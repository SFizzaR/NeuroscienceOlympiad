const express = require("express");

const dotenv = require("dotenv").config();
const cors = require('cors');

const { verifyPin } = require('./controller/pinController');
const { verifyCrosswordWord } = require('./controller/crosswordController');


const supabaseAdmin = require('./config/supabaseAdmin');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/rooms/:roomNumber/verify-pin', verifyPin);
app.post('/api/crossword/verify-word/:wordIndex', verifyCrosswordWord);
app.use('/api/participants', require('./routes/userRoutes'));



app.listen(port, ()=>{
    console.log(`server running on port:  ${port}`)
})
