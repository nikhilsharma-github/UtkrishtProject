// username1
// username11emanresu


import mongoose from "mongoose";


const Connection= async(username,password)=>{
    // const URL=`mongodb://username1: username11emanresu@utkrishtprojectcluster-shard-00-00.nho8l.mongodb.net:27017,utkrishtprojectcluster-shard-00-01.nho8l.mongodb.net:27017,utkrishtprojectcluster-shard-00-02.nho8l.mongodb.net:27017/?ssl=true&replicaSet=atlas-4ki5l4-shard-0&authSource=admin&retryWrites=true&w=majority`;

    const URL=`mongodb+srv://${username}:${password}@utkrishtprojectcluster.nho8l.mongodb.net/?retryWrites=true&w=majority`;
    try{
            await mongoose.connect(URL, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
                // useCreateIndex: true
            })
            console.log("Database Connected successfully");
    }
    catch(error){
            console.log("Error while connecting with database",error);
    }

}

export default Connection;