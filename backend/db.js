const mongoose =require('mongoose');
const mongooseURI = "mongodb://localhost:27017/inotebook?directConnection=true"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongooseURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
  

 module.exports = connectToMongo