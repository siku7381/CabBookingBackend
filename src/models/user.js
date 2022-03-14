import mongoose from 'mongoose';
import validator from 'validator';


const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    mobile : {
        type : String,
        trim : true,
        validate (value) {
            if (value.length !== 10 ) {
                throw new Error('Invalid Number!!!');
            }
        }
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    longitude : {
        type : Number,
        required : true
    },
    latitude : {
        type : Number,
        required : true
    }
});

const User = mongoose.model('User',userSchema);

export default User;