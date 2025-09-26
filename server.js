const express = require("express");
const axios = require("axios");

const app = express();

// Root route - welcome message
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 Welcome to Nirob Pindown API!</h1>
    <p>Use the endpoint <code>/nirob?url=YOUR_URL</code> to get video details.</p>
    <p>Example:</p>
    <a href="/nirob?url=https://www.pinterest.com/pin/736408976613433956/">
      /nirob?url=https://www.pinterest.com/pin/736408976613433956/
    </a>
  `);
});

// /nirob endpoint
app.get("/nirob", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    const response = await axios.post(
      "https://pindown.io/download",
      { url },
      {
        headers: {
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "origin": "https://pindown.io",
          "referer": "https://pindown.io",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        },
        timeout: 15000, // 15 sec timeout
      }
    );

    const data = response.data;

    const urlx = data?.originalVideoUrl
      ? "https://pindown.io" + data.originalVideoUrl
      : null;

    const result = {
      author: "NIROB",
      title: data?.title || "No title",
      thumbnail: data?.coverUrl || null,
      url: urlx,
    };

    res.json(result);
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    if (error.response) {
      res.status(error.response.status).json({
        error: true,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
