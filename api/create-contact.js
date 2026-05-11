import axios from "axios";

export default async function handler(req, res) {

  // CORS
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

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  try {

    const { email, firstName } = req.body;

    const response = await axios.post(
      "https://api.omnisend.com/v5/contacts",
      {
        identifiers: [
          {
            type: "email",
            id: email,
            channels: {
              email: {
                status: "subscribed"
              }
            }
          }
        ],
        firstName: firstName || ""
      },
      {
        headers: {
          "X-API-KEY": process.env.OMNISEND_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json(response.data);

  } catch (error) {

    console.error(error.response?.data);

    return res.status(500).json({
      error: "Failed to create contact"
    });
  }
}