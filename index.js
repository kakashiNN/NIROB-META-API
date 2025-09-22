import express from "express";
import axios from "axios";
import FormData from "form-data";

const app = express();

app.get("/download", async (req, res) => {
  try {
    const form = new FormData();
    form.append("url", "https://pin.it/6Qf6aPf0n");
    form.append("Pzafq", "0f2499eb37a7945d28e1263166f4f5c4");

    const response = await axios.post("https://pindown.io/action", form, {
      headers: {
        ...form.getHeaders(),
        cookie:
          "session_data=s1ftfglj67u85je73ncmn2umeq; _ga=GA1.1.1672500049.1758541716; __gads=ID=57334dcf0ecb1a85:T=1758541728:RT=1758542306:S=ALNI_MbNgA9_5hmvn8yIowUGMvyoK767RQ; __gpi=UID=000011509ff48657:T=1758541728:RT=1758542306:S=ALNI_MYaUExmK-a7V4ILLjYOWzqpCzI-ag; __eoi=ID=d165d9c3dd77fa93:T=1758541728:RT=1758542306:S=AA-AfjZDdpF4UnaFVhUZWut9Sq_A; _ga_CY8JXYCQJS=GS2.1.s1758541715$o1$g1$t1758542538$j56$l0$h0; FCNEC=%5B%5B%22AKsRol91tHWRh7c8lpTCfNZTI1f2CMHWJcOlEsWxD1PJsDlrDKu-BaKLabaZPZ0zANLLZUQa5tP5LHmIMX2m8vB51BFx4GvKqKJsIB3stU-bCNCFRBE61mXYIsJ5bFqEjmJz_aEpYleSeDXXgsZD9fuvWKClgz6k7A%3D%3D%22%5D%5D",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
      },
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Render এ অবশ্যই process.env.PORT ব্যবহার করতে হবে
app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Server running...");
});
