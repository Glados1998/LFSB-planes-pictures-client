const mongoose = require ( "mongoose" );
const { Schema } = mongoose;


const aircraftSchema = new Schema ( {
    image : String ,
    operator : {
        type : Schema.Types.ObjectId ,
        ref : "Operator"
    } ,
    aircraft_name : {
        type : Schema.Types.ObjectId ,
        ref : "AircraftName"
    } ,
    aircraft_type : {
        type : String ,
        enum : [ "public" , "private" ]
    } ,
    year_of_manufacturing : String ,
    year_of_first_flight : String ,
    aircraft_identification : {
        registry : String ,
        serial_number : String
    } ,
} );


const operatorSchema = new Schema ( {
    name : String ,
} );

const aircraftNameSchema = new Schema ( {
    name : String ,
} );

const Aircraft = mongoose.model ( "Aircraft" , aircraftSchema );
const Operator = mongoose.model ( "Operator" , operatorSchema );
const AircraftName = mongoose.model ( "AircraftName" , aircraftNameSchema );

module.exports = { Aircraft , Operator , AircraftName };

