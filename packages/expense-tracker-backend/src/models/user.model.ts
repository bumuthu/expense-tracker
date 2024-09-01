import { UserModel } from 'expense-tracker-common';
import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document, UserModel { }

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const UserDBModel = mongoose.models['User'] || mongoose.model<UserDocument>('User', userSchema);

export default UserDBModel;
