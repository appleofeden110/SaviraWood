const { createServer } = require('http');
const { getAll, getOne, createNewProd, updateProd, deleteProd } = require('./controllers/productController.js');

const server = createServer((req, res) => {
                if (req.url === '/' && req.method === 'GET') {
                        res.writeHead(200, { 'Content-Type': 'application/json '});
                        res.end(JSON.stringify({ message: 'Home' }));
                } else if (req.url === '/products' && req.method === 'GET'){
                        getAll(req, res);
                        console.log('Request received');
                } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'GET') {
                        const id = parseInt(req.url.split('/')[2]);
                        getOne(req, res, id);
                        console.log('Request received');
                } else if (req.url === '/products' && req.method === 'POST') {
                        createNewProd(req, res); 
                        console.log('Request Received');
                } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'PUT') {
                        const id = parseInt(req.url.split('/')[2]);
                        updateProd(req, res, id);
                        console.log('Request Received');
                } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'DELETE') {
                        const id = parseInt(req.url.split('/')[2]);
                        deleteProd(req, res, id);
                        console.log('Request Received');
                } else {                 
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Route not found' }));
                console.log('No reqests were received')
                } 
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));