const mongoose = require ( "mongoose" );
const { Schema } = mongoose;


const aircraftSchema = new Schema ( {
    image : String ,
    aircraft_type : {
        type : String ,
        enum : [ "commercial" , "military" , "private" ]
    } ,
    operator : {
        type : Schema.Types.ObjectId ,
        ref : "Operator"
    } ,
    year_of_manufacturing : Number ,
    year_of_first_flight : Number ,
    aircraft_identification : {
        registry : String ,
        serial_number : String
    } ,
} );


const operatorSchema = new Schema ( {
    name : String ,
} );

const Aircraft = mongoose.model ( "Aircraft" , aircraftSchema );
const Operator = mongoose.model ( "Operator" , operatorSchema );

