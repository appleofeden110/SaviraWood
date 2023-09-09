
function routes(method, route, fn) {
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
}
    