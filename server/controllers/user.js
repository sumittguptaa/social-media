import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../model/userModal.js"

export const signin = async (req, res) => {
    const {email,password} = req.body
    try {
  
        const existingUser = await User.findOne({email})
        if(!existingUser) return res.status(404).json({message : "User does not exist"})
        const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
        if(!isPasswordCorrect) res.status(400).json({message : "Invalid credentials"})
        const token = jwt.sign({email: existingUser.email,id: existingUser._id},"test" ,{expiresIn: "1h"})
        const result = existingUser
        res.status(200).json({result,token})
    } catch (error) {
        res.status(404).json(error)
    }

}
export const signup = async (req, res) => {
    const {email,password,confirmPassword,firstName,lastName} = req.body
   
    try {
       const existingUser = await User.findOne({email})
       if(existingUser) return res.status(400).json({message : "User already exists"})

        if(password !== confirmPassword) return res.status(400).json({message : "Password does not match"})
       
        const hashedPassword = bcrypt.hashSync(password,12)
      
        const result = await User.create({email, password : hashedPassword,name : `${firstName} ${lastName}`})
        
        const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" })
        
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(404).json(error)
    }

}