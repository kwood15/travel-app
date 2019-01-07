const express = require('express');
const locations = require('./api/locations');

const app = express();
const port = process.env.PORT || 3001;

app.get('/api/destinations', (req, res) => {
  const query = req.query.search.toLowerCase();

  const matchedLocations = locations.results.docs.filter(item => {
    return item.name.toLowerCase().includes(query);
  });

  res.send(matchedLocations);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
