const dbData = require('../public/db.json');

module.exports = (req, res) => {
  // Désactivez la compression automatique
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Envoyez les données sans compression
  res.status(200).send(JSON.stringify(dbData.products));
};
