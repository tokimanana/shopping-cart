const dbData = require('../public/db.json');

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Encoding', 'gzip');

  // Get pagination parameters
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '5', 10);

  // Validate pagination parameters
  const validPage = Math.max(1, page);
  const validLimit = Math.min(Math.max(1, limit), 20); // Max 20 per page

  const startIndex = (validPage - 1) * validLimit;
  const endIndex = startIndex + validLimit;

  // Paginate and strip large imageUrl fields to reduce payload
  const paginatedProducts = dbData.products.slice(startIndex, endIndex).map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price
    // imageUrl intentionally excluded to reduce payload size
  }));

  // Response metadata
  const response = {
    data: paginatedProducts,
    pagination: {
      page: validPage,
      limit: validLimit,
      total: dbData.products.length,
      totalPages: Math.ceil(dbData.products.length / validLimit)
    }
  };

  res.status(200).json(response);
}
