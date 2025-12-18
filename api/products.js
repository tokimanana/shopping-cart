const dbData = require('../public/db.json');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const products = dbData.products.slice(0, 10);
  res.status(200).send(JSON.stringify(products));
};
