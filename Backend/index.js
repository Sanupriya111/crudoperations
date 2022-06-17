const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017',{
    dbName:'DummyMongo',
    useNewUrlparser:true,
    useUnifiedTopology:true
},err=>err?console.log(err):console.log('db connected'))

    const UserSchema=mongoose.Schema({
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        phno:{
            type:String,
            required:true,
        },
        pwd:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        date:{
            type:Date,
            default:Date.now
        }
    });

    const User = mongoose.model('users',UserSchema);
    User.createIndexes();
    //for express
   
    const express=require('express');
    const app=express();
    const cors=require('cors');
    app.use(express.json())
    app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({limit: "30mb",extended:true}));

    app.use(cors());
    app.get('/',(req,resp)=>{
        resp.send("App is working")
    })
    app.post('/register',async(req,resp)=>{
        try {
            console.log("try",req.body)
            const user = new User(req.body);
            let result = await user.save();
            result = result.toObject();
            if (result) {
                delete result.pwd;
                resp.send(req.body);
                //console.log(result);
               
            } else {
                console.log("User already register");
            }
    
        } catch (e) {
            resp.send("Something Went Wrong");
        }    })
app.get('/users',(req,res)=>{
    User.find().then(function(data){
        if (data==0){
            return res.status(401).json({
               success:false,
               error:true ,
               message:'no user found'
            })
        }else{
            return res.status(200).json({
                success:true,
                error:false ,
                data:data
               
            })
        }
    })
})
app.get("/update/:id",(req,res)=>{
    User.findById(
        req.params.id,(error,data)=>{
            if(error){
return console.log(error);
            }else{
                res.json(data);
            }
            }
    )
    
})
app.post("/update-data/:id",(req,res,next)=>{
    User.findOneAndUpdate(
        {_id:req.params.id},
        {
            $set:{
             name:req.body.name,
             email:req.body.email,
             phno:req.body.phno,
             pwd:req.body.pwd   

            },
        },{new:true},(error,data)=>{
            if(error){
                console.log(error);

            }else{
                res.json(data);
                console.log(data);
                console.log("data updated succsessfully");
            }
        }
    )
})
app.delete("/delete-data/:id",
(req,res,next)=>{
    User.findByIdAndRemove({_id:req.params.id},(error,data)=>{
    if(error){
        return next(error);
    }else{
        res.status(200).json({msg:data})
    }
    
})})

    app.listen(5000,()=>{
        console.log('App Listen at port 5000');
    });
    
