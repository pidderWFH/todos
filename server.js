const http = require("http");
const { v4: uuidv4 } = require("uuid");
const headers = require("./headers");
const errorHandle = require("./errorHandle");
const todos = [];
const port = 8080;

const requestListener = (req, res)=>{

    let body = "";
    req.on("data", chunk=>{
        body+=chunk;
    });

    if(req.url == "/todos" && req.method == "GET"){
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            "status": "success",
            "data": todos,
        }));
        res.end();
    }else if (req.url == "/todos" && req.method == "POST"){
        req.on("end", ()=>{
            try{
                const title = JSON.parse(body).title;
                if (title !== undefined){
                    const todo = {
                        "title": title,
                        "id": uuidv4(),
                    };
                    todos.push(todo)
                    res.writeHead(200, headers);
                    res.write(JSON.stringify({
                        "status": "success",
                        "data": todos,
                    }));
                    res.end();
                }else{
                    const err = 400;
                    errorHandle(err, res);
                }
                
            }catch{
                const err = 400;
                errorHandle(err, res);
            }

            
        })
        
        
    }else if (req.url == "/todos" && req.method == "DELETE"){
        todos.length = 0;
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            "status": "success",
            "data": todos,
        }));
        res.end();
    }else if (req.url.startsWith("/todos/") && req.method =="DELETE"){
        const id = req.url.split("/").pop();
        const index = todos.findIndex(element => element.id == id);
        if (index !== -1){
            todos.splice(index, 1);
            res.writeHead(200, headers);
            res.write(JSON.stringify({
                "status": "success",
                "data": todos,
            }));
            res.end();
        }else{
            const err= 401;
            errorHandle(err, res);
        }
        
    }else if (req.url.startsWith("/todos/") && req.method =="PATCH"){
        //根據request資料
        req.on("end", ()=>{
            try{
                const todo = JSON.parse(body).title;
                const id = req.url.split("/").pop();
                const index = todos.findIndex(element => element.id == id);
                if (todo !== undefined && index !== -1){
                    todos[index].title = todo;
                    res.writeHead(200, headers);
                    res.write(JSON.stringify({
                    "status": "success",
                    "data": todos,
                }));
                res.end();
                }else{
                    const err = 400;
                    errorHandle(err, res);
                }
               
                res.end();
            }catch{
                const err = 400;
                errorHandle(err, res);
            }
        })
        
    }else if (req.method == "OPTIONS"){
        res.writeHead(200, headers);
        res.end();
    }
    else{
        err = 404;
        errorHandle(err, res);
    }
    
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || port);