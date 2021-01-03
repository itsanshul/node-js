const fs = require('fs');

const requestHandler = (req,res) => {
const url = req.url;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>My Title</title></head>');
        res.write('<body><form method="POST" action="/message"><input type="text" name="message" /><button type="submit">Submit</button></form></body>');
        res.write('</html>')
        return res.end();
    }
    if(url === '/message' && req.method === 'POST')
    {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message, err => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-type','text/html');
    res.write('<html>');
    res.write('<head><title>My Title</title></head>');
    res.write('<body><h1>Hello, from body sections</h1></body>');
    res.write('</html>');
    res.end();
}
module.exports = requestHandler