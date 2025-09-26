import express from "express";
import axios from "axios";

const app = express();

// GET endpoint: /dl?url=
app.get("/dl", async (req, res) => {
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
          "authority": "pindown.io",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "cookie": "_ga=GA1.1.1672500049.1758541716; fpestid=ekOv6ZV6GmeWVg4oJvRnUHfperYdCvZoj8DdZh9sLAH1I_Gjplq1sQMJyfROvZlE47HQ3g; session_data=6lnc6nuqlrofec9bg1g4etmgml; SITE_TOTAL_ID=5c880f7e3bb2491631fc24f78b77a9ac; _ga_CY8JXYCQJS=GS2.1.s1758905161$o3$g1$t1758905504$j58$l0$h0; __gads=ID=57334dcf0ecb1a85:T=1758541728:RT=1758905520:S=ALNI_MbNgA9_5hmvn8yIowUGMvyoK767RQ; __gpi=UID=000011509ff48657:T=1758541728:RT=1758905520:S=ALNI_MYaUExmK-a7V4ILLjYOWzqpCzI-ag; __eoi=ID=d165d9c3dd77fa93:T=1758541728:RT=1758905520:S=AA-AfjZDdpF4UnaFVhUZWut9Sq_A; FCNEC=%5B%5B%22AKsRol_E5NjpS1z08WYX4aEf6HYDVfxJ1hR2qerN_GtQmXandyYGnU95GVgm0Jt199IB0vbmFFxwy0mHegO5qfo_JaB3ut76UQg29sNmN4wuq42ai6wPqteDKg7mgyEpzUkpM9UWR1cWlBL59BHcYd8PKpMP593j_g%3D%3D%22%5D%5D", // replace with valid cookies
          "origin": "https://pindown.io",
          "pragma": "no-cache",
          "referer": "https://pindown.io",
          "sec-ch-ua": "\"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        },
      }
    );

    // extract needed fields
    const data = response.data;
    const urlx = "https://pindown.io" + data.originalVideoUrl;

    const result = {
      author: "NIROB",
      title: data?.title || "No title",
      thumbnail: data?.coverUrl || null,
      url: urlx || null,
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
