const headers = require("./headers");
function errorHandle(res){
    
    res.writeHead(400, headers);
    res.write(JSON.stringify({
        "status": "false",
        "message": "欄位錯誤or無此欄位",
    }));
    res.end();
}
module.exports = errorHandle;