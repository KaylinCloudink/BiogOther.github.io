const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // 将请求的 URL 转换为文件路径
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  // 获取文件扩展名，设置正确的 Content-Type
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.css': contentType = 'text/css'; break;
    case '.js': contentType = 'application/javascript'; break;
    case '.json': contentType = 'application/json'; break;
    case '.png': contentType = 'image/png'; break;
    case '.jpg': contentType = 'image/jpeg'; break;
    // 根据需要添加更多类型
  }
  
  // 读取并返回文件
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});