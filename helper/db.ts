import mongoose from "mongoose";

export async function connectDB(){
    try{
        await mongoose.connect("mongodb+srv://debojjoti550:shovon1560@cluster0.oqkez.mongodb.net/workManager");

        console.log("Connected to Database.")
    }
    catch(err){
        console.log(err);
    }
}