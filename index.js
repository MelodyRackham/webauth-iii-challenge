const server = require('./server');

const port = process.env.PORT || 10000;
server.listen(port, () => {
  console.log(`*** Server listening on ${port} ***`);
});
