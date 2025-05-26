import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUser= await User.find({_id: {$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUser)
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userTochatId} = req.params;
        const myId = req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId, receiverId:userTochatId},
                {senderId:userTochatId,receiverId:myId} 
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage=  async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id: receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;
        if(image)
        {
            const uploadresponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadresponse.secure_url;       
        }
        const newmessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newmessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newmessage);
        }

        res.status(200).json(newmessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}