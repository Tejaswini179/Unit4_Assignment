
const express = require("express");
const  mongoose = require("mongoose");

const app = express();
const connect=()=>{
    mongoose.connect(
        "mongodb://127.0.0.1:27017/lib"
    )
}

//author schema
//step 1:creating author schema
const authorSchema = mongoose.Schema({
    firstName: {type:String,required:true},
    lastName:{type:String,required:false},
},
{
    timestamps:true,
})
//step 2: creating author model
const Author = mongoose.model("author",authorSchema)

//section schema
//step 1:creating section schema
const sectionSchema = new mongoose.Schema({
    sectionName:{type:String,required:true}
},
{
    timestamps:true,
})
//step 2: creating section model
const Section = mongoose.model("section",sectionSchema);

//book schema
//step 1:creating book schema
const bookSchema = mongoose.Schema({
    bookName:{type:String,require:true},
    sectionName:{type:String,required:true},
    body:{type:String,require:true},

},
{
    timestamps:true,
})
//step 2: creating book model
const Book = mongoose.model("book",bookSchema);

 app.get("/autor/:id",async (req,res) =>{
     try {
         const users = await  Author.find().lean().exec();
         return res.status(200).send({users:users})
         
     } catch (error) {
         res.status(5000).send(error)
     }
 })
 app.get("/book/:id",async (req,res) =>{
    try {
        const users = await  Book.find().lean().exec();
        return res.status(200).send({books:books})
        
    } catch (error) {
        res.status(5000).send(error)
    }
})


app.listen(5000, async()=>{
    try {
        await connect()

    } catch (error) {
        console.log(error)
    }
    console.log("connect with port 5000")
} )