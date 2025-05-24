import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: Number,
        required: true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, //URL of the resume file
        resumeOriginalName:{type:String}, //Original name of the resume file
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, // Reference to the Company model
        profilePhoto:{type:String, default:""}, //URL of the profile photo
    }
  },{timestamps: true,}
);
const User = mongoose.model('User', userSchema);
export default User;