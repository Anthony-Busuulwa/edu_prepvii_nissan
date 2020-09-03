const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, 
        required: true, 
        //unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    password: {type: String, required: true}

});

module.exports=mongoose.model('User', userSchema);