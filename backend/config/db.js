import mongoose from "mongoose";

// function to connect to the mongodb database
const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('Kết nối Database thành công!'));

    mongoose.connection.on("error", (err) => console.error("Lỗi kết nối Database:", err));

    await mongoose.connect(process.env.MONGODB_URI, {
    });
}

export default connectDB