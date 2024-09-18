const fs = require('fs')
const http = require('http')





const server = http.createServer((req, res)=> {
    if(req.method === 'GET'){
        fs.readFile('input.txt', 'utf-8', (err, data)=> {
            if(err)throw err;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
        })
    }
})



server.listen(3003, ()=> {
    console.log('Server is listening on 3003');
})