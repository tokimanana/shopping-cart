const dbData = require('../public/db.json');

export default function handler(req, res) {
  // Activez CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  res.status(200).json(dbData.products);
}
