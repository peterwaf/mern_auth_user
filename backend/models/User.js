const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      requred: true,
    },
    lastName: {
      type: String,
      requred: true,
    },
    email: {
      type: String,
      requred: true,
    },
    password: {
      type: String,
      requred: true,
    },
  },
  { timestamps: true }
);

//password hashing middleware

UserSchema.pre("save", async function (next) {
  //check if the password is modified

  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashSalt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(this.password, hashSalt);
    this.password = hashPass;
    next(); //proceed to save
  } catch (error) {
    next(error); //pass the error to mongoose
  }
});

//compare the password for log in

UserSchema.methods.comparePassword = async function (clientPassword) {
  try {
    return await bcrypt.compare(clientPassword, this.password); //true or false
  } catch (error) {
    console.error("Error while comparing passwords:", error);
    throw error; // Properly propagating the error
  }
};

module.exports = mongoose.model('User',UserSchema);
