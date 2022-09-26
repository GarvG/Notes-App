const User = require("../model/userModel");
const respone = require("../responeMessage.json");
const code=require("../statusCode.json");
const generateToken = require("../utils/generateToken");
const {
    failureResponse,
    successResponse
} = require("../utils/responseSchema");

const registerUser = async (req, res) => {
    try{
        const {
            name,
            email,
            password
        } = req.body;

        const userExists = await User.findOne({
            email
        });
        if (userExists) {
            let failure = failureResponse(code.BAD_REQUEST.status, respone.User.UserExist, code.BAD_REQUEST.statusCode);
            res.status(failure.statusCode).send(failure.body);
        }
        const user = await User.create({
            name,
            email,
            password
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                token:generateToken(user._id)
            })
        } 
        else {
            let failure1 = failureResponse(code.BAD_REQUEST.status, respone.error.errorOccured, code.BAD_REQUEST.statusCode);
            res.status(failure1.statusCode).send(failure1.body);
        }

    }
    catch(err)
    {
        let failure = failureResponse(code.INTERNAL_SERVER_ERROR.status, err.message, code.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }
   
};

const loginUser = async (req, res) => {
   try{
    const {
        email,
        password
    } = req.body
    const user = await User.findOne({
        email
    });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token:generateToken(user._id)

        });
    } else {
        let failure = failureResponse(code.BAD_REQUEST.status, respone.User.UserExist, code.BAD_REQUEST.statusCode);
        res.status(failure.statusCode).send(failure.body);
    }
   }
   catch(err){
    let failure = failureResponse(code.INTERNAL_SERVER_ERROR.status, err.message, code.INTERNAL_SERVER_ERROR.statusCode)
    res.status(failure.statusCode).send(failure.body)
   } 
}
module.exports = {
    registerUser,
    loginUser
};