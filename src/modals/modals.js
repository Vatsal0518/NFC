const mongoose = require("mongoose");
const userCardSchema  = new mongoose.Schema({
    name: {
        type: String,
        trim: true  // Trim leading and trailing spaces
      },
      surname: {
        type: String,
        trim: true
      },
      middlename: {
        type: String,
        trim: true
      },
      age: {
        type: Number,
        min: 0  // Age must be a non-negative number
      },
      dateofbirth: {
        type: String,
        trim: true
      },
      photogallery: {
        type: [String],
        validate: {
          validator: function(arr) {
            return arr.every(val => typeof val === 'string' && val.trim().length > 0); // Ensure all elements in the array are non-empty strings
          },
          message: props => `${props.value} is not a valid photogallery array`
        }
      },
      profileimage: {
        type: String,
        trim: true
      },
      linkdin: {
        type: String,
        trim: true
      },
      facebook: {
        type: String,
        trim: true
      },
      twitter: {
        type: String,
        trim: true
      },
      instagram: {
        type: String,
        trim: true
      },
      portfolio: {
        type: String,
        trim: true
      },
      blog: {
        type: String,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      phone: {
        type: Number,
        min: 1000000000, // Minimum 10-digit phone number
        max: 9999999999  // Maximum 10-digit phone number
      },
      address: {
        type: String
      },
      email: {
        type: String
      },
      userlogin: {
        type: String,
        trim: true,
        unique: true  // Ensure userlogin is unique
      }
  
   
})

const UserCard = new mongoose.model("userCardData",userCardSchema);

module.exports = UserCard;