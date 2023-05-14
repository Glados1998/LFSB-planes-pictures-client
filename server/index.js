require ( 'dotenv' ).config ();
const express = require ( 'express' );
const app = express ();
const port = process.env.PORT || 3000;
const cors = require ( 'cors' );
const mongoose = require ( 'mongoose' );

app.use ( cors () );
mongoose.connect( process.env.MONGO_URI , { useNewUrlParser : true , useUnifiedTopology : true } ).then ( () => {
    console.log ( 'MongoDB connected' );
} ).catch ( (err) => {
    console.log ( 'MongoDB error: ' , err );
    process.exit ( 1 );
} );


app.listen ( port , () => {
    console.log ( `Server listening on port ${port}` );
} );
