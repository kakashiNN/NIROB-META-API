import express from 'express';
import axios from 'axios';
import FormData from 'form-data';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Fixed headers
const FIXED_HEADERS = {
  'authority': 'www.meta.ai',
  'accept': '*/*',
  'cache-control': 'no-cache',
  'origin': 'https://www.meta.ai',
  'referer': 'https://www.meta.ai/prompt/5fd1da13-bea4-414b-9593-40a1e94b07a0',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
  'cookie': 'datr=gznJaCVKeIQnAF2INbDp5qVE; dpr=1.2062500715255737; abra_sess=FsbDxamWlvUCFiAYDnZNdkVvOUZYeXlIUHJ3Fq7uyYwNAA%3D%3D; wd=980x1971',
  'x-asbd-id': '359341',
  'x-fb-lsd': 'D9pSxPsEeuOJvhYxd8Ihmt'
};

app.post('/meta', async (req, res) => {
  try {
    const { ts, post_0, q } = req.body;

    if (!ts || !post_0 || !q) {
      return res.status(400).json({ error: 'Missing ts, post_0 or q in request body' });
    }

    const form = new FormData();
    form.append('ts', ts);
    form.append('post_0', post_0);
    form.append('q', q);

    const response = await axios.post(
      'https://www.meta.ai/ajax/bz',
      form,
      {
        params: {
          '__a': '1',
          '__ccg': 'GOOD',
          '__comet_req': '72',
          '__crn': 'comet.kadabra.KadabraPromptRoute',
          '__hs': '20347.HYP:kadabra_pkg.2.1...0',
          '__hsi': '7550659646274821603',
          '__jssesw': '1',
          '__req': '6',
          '__rev': '1027172221',
          '__s': '5kct3a:408hmj:oyqmrq',
          '__spin_b': 'trunk',
          '__spin_r': '1027172221',
          '__spin_t': ts,
          '__user': '0',
          'dpr': '1',
          'fb_dtsg': 'NAfsHeUE6-TxYEMRY-W3-3r8dzBdirHXk8e6bUm6qMcnK2XI5kR4dCg:16:1758018455',
          'jazoest': '25268',
          'lsd': 'D9pSxPsEeuOJvhYxd8Ihmt',
          'ph': 'C3'
        },
        headers: {
          ...form.getHeaders(),
          ...FIXED_HEADERS
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong', details: error.response?.data || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`NIROB API running on port ${PORT}`);
});
