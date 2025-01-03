import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true)
    if (connected) {
        console.log('MongoDB is already connected');
        return;
    };
    try {
        await mongoose.connect(process.env?.MONGODB_URI || '', {
            // 添加连接选项
            connectTimeoutMS: 10000,     // 连接超时时间
            socketTimeoutMS: 10000,      // Socket 超时时间
            serverSelectionTimeoutMS: 10000,  // 服务器选择超时时间
        });
        connected = true;
        console.log('MongoDB is connected');
    } catch (error) {
        console.log('MongoDB connection error', error);
    }
}

export default connectDB;