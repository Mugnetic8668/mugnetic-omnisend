export default async function handler(req, res) {

  // ======================
  // CORS
  // ======================

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ======================
  // TEST RESPONSE
  // ======================

  return res.status(200).json({
    success: true
  });

}