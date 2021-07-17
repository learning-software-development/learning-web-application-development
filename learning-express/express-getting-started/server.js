const app = express();
const port = 3000;

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.post('/', function (request, response) {
  response.send('Got a POST request')
});

app.put('/user', function (request, response) {
  response.send('Got a PUT request at /user')
});

app.delete('/user', function (request, response) {
  response.send('Got a DELETE request at /user')
});

// Handles 404, when no middleware responded
app.use((request, response, next) => {
  response.status(404).send("Sorry can't find that!");
});

// Error handling
app.use((err, request, response, next) => {
  console.error(err.stack);
  response.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example application listening on port ${port}!`);
});
