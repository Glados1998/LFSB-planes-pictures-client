require ( 'dotenv' ).config ();
const express = require ( 'express' );
const app = express ();
const port = process.env.PORT || 4200;
const cors = require ( 'cors' );
const mongoose = require ( 'mongoose' );
const userRouter = require ( './src/routes/user' );
const aircraftRouter = require ( './src/routes/aircraft' );
const operatorRouter = require ( './src/routes/operator' );
const aircraftNameRouter = require ( './src/routes/aircraftName' );
const { json , urlencoded } = require ( "express" );


app.use ( cors () );
mongoose.connect ( process.env.MONGO_URI , { useNewUrlParser : true , useUnifiedTopology : true } ).then ( () => {
    console.log ( 'MongoDB connected' );
} ).catch ( (err) => {
    console.log ( 'MongoDB error: ' , err );
    process.exit ( 1 );
} );


app.use ( express.json ( { limit : '20mb' } ) );
app.use ( express.urlencoded ( { extended : true , limit : '20mb' } ) );


// Ensure Express serves static files from the uploads directory

app.use ( '/api/user' , userRouter );
app.use ( '/api/aircraft' , aircraftRouter );
app.use ( '/api/operator' , operatorRouter );
app.use ( '/api/aircraft-name' , aircraftNameRouter );

app.listen ( port , () => {
    console.log ( `Server listening on localhost:${port}` );
} );
