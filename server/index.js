require ( 'dotenv' ).config ();
const express = require ( 'express' );
const app = express ();
const port = process.env.PORT || 3000;
const cors = require ( 'cors' );
const mongoose = require ( 'mongoose' );
const userRouter = require ( './src/routes/user' );
const aircraftRouter = require ( './src/routes/aircraft' );

app.use ( cors () );
mongoose.connect( process.env.MONGO_URI , { useNewUrlParser : true , useUnifiedTopology : true } ).then ( () => {
    console.log ( 'MongoDB connected' );
} ).catch ( (err) => {
    console.log ( 'MongoDB error: ' , err );
    process.exit ( 1 );
} );

app.use ( express.json () );
app.use ( express.urlencoded ( { extended : true } ) );
app.use ( userRouter );

app.use ( aircraftRouter );

app.listen ( port , () => {
    console.log ( `Server listening on port ${port}` );
} );
