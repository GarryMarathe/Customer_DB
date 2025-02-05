import mongoose from "mongoose";

const customerSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    hobbies: {
        type: [String],
    }
    
})

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;