/* author shivansh singh */
const path=require('path');
const express=require('express');
const app=express();
const fs=require('fs');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/", function (req, res) {
  fs.readdir("./files", function (err,files) {
    if (err) console.error(err);
    else
        res.render("index",{ files:files });
  });
});

app.post("/create",function(req,res){
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.desc,function(err){
    if(err) console.error(err);
    else{
      res.redirect("/");
    }
  })
});


app.get("/:file_name",function(req,res){
    fs.readFile(`./files/${req.params.file_name.trim()}.txt`,function(err,data){
      if(err) console.error(err);
      else{
        let d=data.toString();
        res.render("data",d={d});
      }
    });
});


app.get('/rename/:file_name',function(req,res){
    res.render('rename',{file_name:req.params.file_name})
});

app.post('/renamed/:old_name',function(req,res){
    fs.rename(`./files/${req.params.old_name}.txt`,`./files/${req.body.new_name}.txt`,function(err){
      if(err) console.error(err);
      else res.redirect('/');
    });
    
});

app.get('/delete/:file_name',function(req,res){
    fs.unlink(`./files/${req.params.file_name}.txt`,function(err){
      if(err) console.error(err);
      else res.redirect('/');
    })
});
app.listen(3000);