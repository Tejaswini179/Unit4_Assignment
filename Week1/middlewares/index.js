const express= require("express")

const app= express()

app.use(allBooks)

app.get("/books",(req,res)=>{
    return res.send({route:"book"})
})



app.get("/book/:name",singleBook,(req,res)=>{
    

    return res.json({bookName: req.name})
})

function allBooks(req,res,next){
  
    console.log("Fetching all books")
    next()
}




function singleBook(req,res,next){

    if(req.params.name=="HarryPotter")
    {
        req.name = req.params.name
    }
    else if(req.params.name=="GameOfThrones")
    {
        req.name=req.params.name
    }
    next()


}


app.listen(5000,()=>{
    console.log("Listening for port 5000")
})