const headers = require("./headers.js");
function errorHandle (err, res){
    if (err == 400){
        res.writeHead(400, headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此title或是ID"
        }));
        res.end();
    }else if (err == 401){
        res.writeHead(401, headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此待辦事項可刪除"
        }));
        res.end();
    }
    else if(err == 404){
        res.writeHead(404, headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "page no found",
        }));
        res.end();
    }
    
}

module.exports = errorHandle;