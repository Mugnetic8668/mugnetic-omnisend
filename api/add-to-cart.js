import axios from "axios";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  try {

    const {
      email,
      productName,
      productId,
      price
    } = req.body;

    const response = await axios.post(
      "https://api.omnisend.com/v5/events",
      {
        email: email,
        eventName: "addedToCart",
        properties: {
          productName,
          productId,
          price
        }
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
      error: "Failed to send event"
    });
  }
}