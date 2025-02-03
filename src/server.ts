import mongoose from "mongoose";
import app from "./app";
import config from "./config";

//  dev-stationery-shop server 
 async function server(){
    try {
        // connect to database 
        await mongoose.connect(config.db_user as string)

        app.listen(config.port, ()=>{
            console.log(`Server is running on port ${config.port}📚✅`);
        
        })
    } catch (error) {
        console.log(error);
        
    }
 }

server();