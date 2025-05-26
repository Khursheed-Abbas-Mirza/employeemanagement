const empSchema={
    name:{
        notEmpty:true,
        isLength:{
            options:{min:4,max:20},
            errorMessage:"Name must be between 4 to 20 characters"
        }
    },
    email:{
        notEmpty:true,
        isEmail:true,
        errorMessage:"Invalid Email"
    },
    department:{
        notEmpty:true,
        errorMessage:"department field cannot be empty"
    },
    role:{
        notEmpty:true,
        errorMessage:"role field cannot be empty"
    }
}
module.exports={empSchema}