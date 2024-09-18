const fs = require('fs')
const http = require('http')





const server = http.createServer((req, res)=> {
    if(req.method === 'GET'){
        fs.readFile('input.txt', 'utf-8', (err, data)=> {
            if(err)throw err;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
        })
    }else if (req.method === 'POST'){
        let body = ''
        req.on('data', chunck => {
            body += chunck
        })
        req.on('end', ()=> {
            fs.writeFile('output.txt', body, 'utf8', (err)=> {
                if(err)throw err;
                res.writeHead(200, {'Content-Type':'text/plain'})
                res.end('Content added successfully')
            })

        })

        
    }
})



server.listen(3003, ()=> {
    console.log('Server is listening on 3003');
})