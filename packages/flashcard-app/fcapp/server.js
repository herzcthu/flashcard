// Express wrapper to run the DigitalOcean Function locally
const express = require('express');
const bodyParser = require('body-parser');
const { main } = require('./index');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files and API using the same handler as DigitalOcean
app.all('*', async (req, res) => {
  // Build event object similar to DigitalOcean Functions
  const event = {
    path: req.path,
    httpMethod: req.method,
    headers: req.headers,
    queryStringParameters: req.query,
    body: req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : undefined
  };
  try {
    const result = await main(event, {});
    if (result.headers) {
      Object.entries(result.headers).forEach(([k, v]) => res.setHeader(k, v));
    }
    res.status(result.statusCode || 200);
    if (result.isBase64Encoded) {
      res.send(Buffer.from(result.body, 'base64'));
    } else {
      res.send(result.body);
    }
  } catch (e) {
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Local server running at http://localhost:${port}`);
});
