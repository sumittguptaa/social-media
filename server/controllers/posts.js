import PostMessage from "../model/postMessage.js"
import mongoose from "mongoose"

export const getPost =  async(req,res) => {
    const {id} = req.params
    try {
        const post = await PostMessage.findById({_id :id})
        res.status(200).json({ data: post})
    } catch (error) {
    res.status(404).json(error)   
    }

}
export const getPosts = async (req, res) => {
    const { page } = req.query
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; 
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    } catch (error) {
        res.status(404).json(error)
    }

}
export const getPostBySearch = async (req, res) => {
    const {searchQuery,tags} = req.query
    try {
      const title = new RegExp(searchQuery,'i')
      const posts = await PostMessage.find({$or : [{title},{tags : {$in : tags.split(',')}}]})
      res.json({ data : posts})
    } catch (error) {
        res.status(404).json(error)
    }

}
export const createPosts = async(req, res) => {
    const post = req.body

    const newPost = new PostMessage({...post,creator: req.userId,createdAt : new Date().toISOString()})
    
    try {
        await newPost.save()
       res.status(202).json(newPost)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}
export const updatePost = async(req,res) => {
    const {id : _id}  = req.params
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json("No post with found with that id")
   const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post ,_id},{new: true})
   res.json(updatePost)
}
export const deletePost = async(req,res)=>{
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json("No post with found with that id")

    await PostMessage.findByIdAndRemove(_id)
    res.json({message : "Post deleted succefully"})
}
export const likePost = async(req,res)=>{
    const {id} = req.params
    console.log(id)
    if(!req.userId) return res.status(400).json({message : "Unauthenticated"})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("No post with found with that id")

  const post =  await PostMessage.findById(id)
  const index = post.likes.findIndex((iid)=> iid === String(req.userId) )
  if(index === -1){
    post.likes.push(req.userId)
  }else{
    post.likes = post.likes.filter((iid) => iid!== String(req.userId))
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new: true})
  res.json(updatedPost)

}