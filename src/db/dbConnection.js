const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("Database Connected 🚀");
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnect;
