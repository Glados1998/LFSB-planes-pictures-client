import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema ( {
    name : {
        type : String ,
        required : true
    } ,
    username : {
        type : String ,
        required : true ,
        unique : true
    } ,
    role : {
        type : Schema.Types.ObjectId ,
        ref : "Role"
    } ,
    credential : {
        email : {
            type : String ,
            required : true ,
            unique : true ,
            match : /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        } ,
        password : {
            type : String ,
            required : true
        }
    } ,
} , {
    timestamps : true
} );

const roleSchema = new Schema ( {
    name : {
        type : String ,
        required : true ,
        unique : true
    } ,
    // Add any other fields related to roles
} );

const User = mongoose.model ( "User" , userSchema );
const Role = mongoose.model ( "Role" , roleSchema );
