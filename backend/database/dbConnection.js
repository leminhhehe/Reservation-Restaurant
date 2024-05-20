import mongoose from "mongoose";

export const dbConnection = () =>{
    mongoose.connect(process.env.MONGGO_URI,{
        dbName: "MERN_RESTAURANT"        
    })
    .then(() =>{
        console.log("Connection to Database successfully");
    })
    .catch(() => {
        console.log(`Connection to Database failed!  ${err}`);
    })

}