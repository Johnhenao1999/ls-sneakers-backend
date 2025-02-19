import mongoose from 'mongoose';


export const  connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://lsneakers:r3DcgZw42iE6t2Ef@lsneakers.pg47i.mongodb.net/?retryWrites=true&w=majority&appName=lsneakers')
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error(error)
    }
};