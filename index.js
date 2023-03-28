const fs = require("fs");
const http = require("http");

// Blocking synchronous way
// const one = fs.readFileSync('./files/one.txt','utf-8');
// const newText =  `This is the front text ${one}`;
// fs.writeFileSync('./files/one.txt',newText);
// console.log(`File Written! `);

// Non-Blocking Asynchronous way
// fs.readFile('./files/one.txt','utf-8',(err, data) =>{
//     console.log(data)
// })
// console.log("Will read file!")

const server = http.createServer((req, res) => {
  const pathname = req.url;
  if (pathname === "/overview" || pathname === "/") {
    res.end("Hello This is the OVERVIEW");
  } else if (pathname === "/product") {
    res.end("Hello This is the PRODUCT");
  } else if (pathname === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      console.log(productData);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello World"
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening to request on port 3000");
});
