const http = require("http");

const server = http.createServer((request, response) => {
  console.log("holaaaaaaaa");
  response.end("Esto lo tire deferwterwnd");
});

const port = 8080;

server.listen(port, () => {
  console.log(`servidor levantado en puerto ${port}`);
});
