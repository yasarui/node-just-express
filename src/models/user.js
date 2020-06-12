const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Course = require('./course');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
           if(!validator.isEmail(value)){
               throw new Error("Email is not valid");
           }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value){
           if(value.toLowerCase().includes("password")){
               throw new Error(`Password does not include ${valie}`)
           }
        }
    },
    token: {
        type: String
    }
});

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8);
    }
    next();
});

userSchema.pre('remove',async function(next){
    const user = this;
    await Course.deleteMany({owner:user._id});
    next();
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.token;
    return userObject;
}

userSchema.statics.findUserByCredentials = async function(email,password){
    const user = await User.findOne({email});
    if(!user) throw new Error("Invalid login");
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error("Invalid Login");
    return user;
}

const User = mongoose.model("User",userSchema);

module.exports = User;