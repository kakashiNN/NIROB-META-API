import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Pinterest Downloader API Running...");
});

// Pinterest API endpoint
app.get("/pview", async (req, res) => {
  try {
    const response = await axios.get(
      "https://l.sharethis.com/pview?event=pview&hostname=pindown.io&location=%2F&product=unknown&url=https%3A%2F%2Fpindown.io%2F&source=sharethis.js&fcmp=false&fcmpv2=false&has_segmentio=false&title=Pinterest%20Video%20Downloader%20-%20Download%20Pinterest%20Video%20HD%20Online&refDomain=www.google.com&cms=unknown&publisher=6857cc1e8ca9160019f2948f&sop=true&version=st_sop.js&lang=en&fpestid=ekOv6ZV6GmeWVg4oJvRnUHfperYdCvZoj8DdZh9sLAH1I_Gjplq1sQMJyfROvZlE47HQ3g&description=Download%20Pinterest%20video%20to%20your%20phone%2C%20PC%2C%20or%20tablet%20with%20highest%20quality.%20Use%20our%20Pinterest%20Downloader%20with%20your%20browser.%20Support%20both%20Android%2C%20and%20iOS.&ua=%22Chromium%22%3Bv%3D%22137%22%2C%20%22Not%2FA)Brand%22%3Bv%3D%2224%22&ua_mobile=true&ua_platform=Android&ua_full_version_list=%22Chromium%22%3Bv%3D%22137.0.7337.0%22%2C%20%22Not%2FA)Brand%22%3Bv%3D%2224.0.0.0%22&ua_model=RMX3261&ua_platform_version=11.0.0&uuid=0bbf587d-6752-4428-bc69-ebeed96e4fae",
      {
        headers: {
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "Cookie": "__stid=ZGSAAmjRcPwAAAAIFtd1Aw==; __stidv=2",
          "Origin": "https://pindown.io",
          "Pragma": "no-cache",
          "Referer": "https://pindown.io/",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
          "sec-ch-ua": '"Chromium";v="137", "Not/A)Brand";v="24"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": '"Android"'
        }
      }
    );

    res.json(response.data); // ক্লায়েন্টে JSON আকারে পাঠাচ্ছে
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
