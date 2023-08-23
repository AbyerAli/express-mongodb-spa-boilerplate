const mongoose = require("mongoose")
const { mongoUri } = require("../config/config")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoUri);
        return conn;
    } catch (err) {
        console.log(`Error: ${err.message}`)
        process.exit(1) //Exit with failure.
    }
}

module.exports = { connectDB }
