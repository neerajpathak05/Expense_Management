import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY="24h";

const createToken=(userId)=>{
    return jwt.sign({id:userId},JWT_SECRET,{expiresIn:TOKEN_EXPIRY});
}

//register a user
export async function registerUser(req,res){
    const{name,email,password}=req.body;
   if (!name || !email || !password) {
    return res.status(400).json({
        success: false,
        message: "All fields are required"
    });
}
if(!validator.isEmail(email)){
    return res.status(400).json({
        success:false,
        message:"Please enter a valid email"
    });
}
if(password.length<8){
    return res.status(400).json({
        success:false,
        message:"Password must be at least 8 characters long"
    })
}
try{
    if(await User.findOne({email})){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        });
    }
    const hashed=await bcrypt.hash(password,10);
    const user=await User.create({name,email,password:hashed});
    const token=createToken(user._id);
    res.status(201).json({
        success:true,
        token,
        user:{
            id:user._id,name:user.name,email:user.email
        }
    });
}
catch(err){
     console.error(err);
    res.status(500).json({
        success:false,
        message:"Internal server error"
    });
}
}

//to login a user

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate JWT token
        const token = createToken(user._id);

        // Send response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// Get Logged-in User Details
export async function getUserDetails(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}



// Update User Profile
export async function updateUserProfile(req, res) {
    try {
        const { name, email, password } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if email already exists
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }
        }

        // Update name and email
        user.name = name || user.name;
        user.email = email || user.email;

        // Update password if provided
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({
                    success: false,
                    message: "Password must be at least 8 characters long"
                });
            }

            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// Change User Password
export async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        // Validate new password
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 8 characters long"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}