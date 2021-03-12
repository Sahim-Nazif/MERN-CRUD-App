const express= require('express');
const router = express.Router();
const {requireSignin}= require('../controllers/auth');


const {create, list, read, update, deletePost}= require('../controllers/post')

//route
router.post('/post', requireSignin, create);
router.get('/posts', list);
router.get('/post/:slug', read);
router.put('/post/:slug', requireSignin, update);
router.delete('/post/:slug', requireSignin, deletePost);


// router.get('/secret', requireSignin,(req, res)=>{

//     res.json({
//         data:req.body.name
//     })
// })
module.exports=router;
