import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('data/questions.json');
const middlewares = jsonServer.defaults();

const port = 8000;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port: ${port}`);
});
