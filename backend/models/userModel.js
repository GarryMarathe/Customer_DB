import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            },
    },
    {timestamps: true}
)

// Before saving, hash the password
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcryptjs.hash(this.password, saltRounds);
    }
    next();
});

const User = mongoose.model('user', userSchema);

export default User;