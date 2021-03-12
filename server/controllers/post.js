const Post = require('../models/Post');
const slugify=require('slugify');


exports.create=(req, res)=>{
  
    const {title,content,user}=req.body;
    const slug=slugify(title);

    //validate
   
    switch(true){
        case !title:
            return res.status(400).json({error:'Title is required'});
            break;
        case !content:
            return res.status(400).json({error:'Content is required'});
            break;
    }
    Post.create({
        title,
        content,
        user,
        slug
    }, (err, post)=>{
        if (err){
            console.error(err);
            res.status(400).json({error:'Duplicate post post. Try another title'})
        }
        res.json(post)
    });


};

exports.list=async (req, res)=>{

    await Post.find({})
        .limit(10)
        .sort({createdAt:-1})
        .exec((err, posts)=>{
        if (err) console.log(err);
        res.json(posts);
    });
};

exports.read=(req, res)=>{
    const {slug}=req.params;

    Post.findOne({slug})
        .exec((err, post)=>{
            if (err){
                throw err;
                
            }else{
                res.json(post);
            }
           
        })
};

exports.update=async(req, res)=>{

    const {slug}= req.params;
    const {title, content, user}=req.body;
   await Post.findOneAndUpdate({slug},{title, content,user},{new:true})
        .exec((err,post)=>{

            if (err){
                throw err;
            }
            else{
                res.json(post)
            }
        })

}

exports.deletePost=(req, res)=>{
    const {slug}=req.params;

    Post.findOneAndRemove({slug})
        .exec((err, post)=>{
            if (err){
                throw err;
                
            }else{
                res.json({message:"Post Deleted !"});
            }
           
        });
};