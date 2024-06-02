const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// Mock data for universities' pros and cons
const universities = {
    'University of Toronto': {
        pros: ['Excellent research facilities', 'Diverse student body', 'Strong reputation'],
        cons: ['High cost of living', 'Large class sizes', 'Competitive atmosphere']
    },
    'University of Waterloo': {
        pros: ['Strong engineering programs', 'Co-op opportunities', 'Innovative environment'],
        cons: ['Cold weather', 'High workload', 'Limited social activities']
    },
    'Western University': {
        pros: ['Beautiful campus', 'Strong alumni network', 'Great student life'],
        cons: ['Less urban', 'Smaller program selection', 'Higher tuition fees']
    }
    // Add more universities as needed
};

// Helper function to serve files
const serveFile = (filePath, contentType, response) => {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            response.writeHead(500);
            response.end('Server Error', 'utf-8');
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
};

// Create the server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        serveFile(path.join(__dirname, 'public', 'index.html'), 'text/html', res);
    } else if (pathname === '/styles.css') {
        serveFile(path.join(__dirname, 'public', 'styles.css'), 'text/css', res);
    } else if (pathname === '/script.js') {
        serveFile(path.join(__dirname, 'public', 'script.js'), 'application/javascript', res);
    } else if (pathname === '/api/university') {
        const universityName = parsedUrl.query.name;
        const university = universities[universityName];

        if (university) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(university));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'University not found' }));
        }
    } else {
        res.writeHead(404);
        res.end('Not Found', 'utf-8');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
