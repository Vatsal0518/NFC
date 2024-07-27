const UserCard= require('../modals/modals')
const express = require("express");
const app = express();
const router = express.Router();
const autMiddleware = require('../login_signup/authentication')

//post data
router.post("/createcard",autMiddleware,async(req,res)=>{
    try{
        
        let { name,surname,middlename,age,dateofbirth,photogallery
          ,profileimage
         , linkdin
          ,facebook
          ,twitter
          ,instagram
          ,portfolio
          ,blog
          ,description
          ,phone 
          ,address
          ,email
          ,userlogin = req.user.id
           } = req.body
           userlogin = req.user.id

        
          

        const userCardData = new UserCard({ name,surname,middlename,age,dateofbirth,photogallery
            ,profileimage
           , linkdin
            ,facebook
            ,twitter
            ,instagram
            ,portfolio
            ,blog
            ,description
            ,phone 
            ,address
            ,email
            ,userlogin
             });
     await userCardData.save();
        res.send(userCardData)
        
    }
    
    catch(e)
    {
        res.status(400).send({
            message:"ivalid credential or data",
            error:e
        })
        console.log(e);

    }
})

//delete data
router.delete("/mycards/delete/:id",async(req,res)=>{
    try{
        const _id  = req.params.id;
        const data = await  UserCard.findByIdAndDelete(_id);
        res.send({
            message:"Card deleted Successfully",
            data: data
        });


    }
    catch(e)
    {
        res.status(400).send("user doesnt exist")
        console.log(e);

    }
})
//update docs

router.patch("/mycard/edit/:id",async(req,res)=>{
    try{
        const _id  = req.params.id;
        const data = await  UserCard.findByIdAndUpdate(_id,req.body);
        res.send(data);


    }
    catch(e)
    {
        res.status(400).send("page doesnot exist")
        console.log(e);

    }
})

router.get("/mycard",autMiddleware,async(req,res)=>{
    try{
       const data  = await UserCard.find({userlogin:req.user.id})
       res.send(data);

    }
    catch(e)
    {
        res.status(400).send("page doesnot exist")
        console.log(e);

    }
})
router.get("/mycard/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const data = await UserCard.findById(_id);
        res.send(data);
        console.log(req.params.id)


    }
    catch(e)
    {
        res.status(400).send("page doesnot exist")
        console.log(e);

    }
})





module.exports = router;