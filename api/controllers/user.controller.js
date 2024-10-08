import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
export const test = (req,res)=>{
    res.json({
        message:'Hello World!',
    })
}
export const updateUser = async (req, res, next) => {
    // Check if the logged-in user is updating their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only update your own account!"));
    }
  
    try {
      const updates = {};
  
      // Only add the fields to be updated if they are provided in the request body
      if (req.body.username) {
        updates.username = req.body.username;
      }
      if (req.body.email) {
        updates.email = req.body.email;
      }
      if (req.body.avatar) {
        updates.avatar = req.body.avatar;
      }
      if (req.body.password) {
        updates.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      // Perform the update
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true }  // Return the updated document
      );
  
      // Check if user was found and updated
      if (!updatedUser) {
        return next(errorHandler(404, "User not found"));
      }
  
      // Exclude password from the response
      const { password, ...rest } = updatedUser._doc;
  
      // Send the updated user object
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  export const deleteUser=async(req,res,next)=>{
     if(req.user.id!==req.params.id) return next(errorHandler(401,'You can only delete your own acccount'));
     try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json( 'User deleted successfully')
     } catch (error) {
        next(error);
     }
  }
  export const getUserListings = async (req, res, next) => {
    
    if (req.user.id === req.params.id) {
      try {
        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listings);
      } catch (error) {
        next(error);
      }
    } else {
      return next(errorHandler(401, 'You can only view your own listings!'));
    }
  };
  export const getUser=async(req,res,next)=>{
    try{
    const user=await User.findById(req.params.id);
    if(!user) return next(errorHandler(404,'User not found'))
      const {password:pass, ...rest}=user._doc;
    res.status(200).json(rest);
}
catch(error){
  next(error);
}
  }