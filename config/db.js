const mongoose = require("mongoose");
const respone=require("../responeMessage.json");
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            
            })
            console.log(respone.Mongo.Connected,conn.connection.host);
    } catch (err) {
        console.log(respone.error.errorOccured,err);
        process.exit()
    }
};

module.exports=connectDB;