const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    pic: { type: String, required: true, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" },
        
}, {
    timestamps: true
})
userSchema.methods.matchPassword = async function name(enteredPass) {
    return await bcryptjs.compare(enteredPass,this.password)
}
userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bcryptjs.genSalt(10);
    this.password=await bcryptjs.hash(this.password,salt)
})
const User = mongoose.model('User', userSchema);
module.exports = User
