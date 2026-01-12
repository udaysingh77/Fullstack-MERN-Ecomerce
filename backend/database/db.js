import mongoose from "mongoose";


async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI,{dbname:"eKart"})
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error)
    }
}

export default connectDb

