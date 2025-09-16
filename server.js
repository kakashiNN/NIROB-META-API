import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Fixed headers from .env
const FIXED_HEADERS = {
  'authority': 'www.meta.ai',
  'accept': '*/*',
  'cache-control': 'no-cache',
  'origin': 'https://www.meta.ai',
  'referer': 'https://www.meta.ai/prompt/5fd1da13-bea4-414b-9593-40a1e94b07a0',
  'user-agent': process.env.USER_AGENT,
  'cookie': process.env.COOKIE,
  'x-asbd-id': '359341',
  'x-fb-lsd': 'D9pSxPsEeuOJvhYxd8Ihmt'
};

// NIROB endpoint
app.post('/nirob', async (req, res) => {
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
          'fb_dtsg': process.env.FB_DTSG,
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

// Start server
app.listen(PORT, () => {
  console.log(`NIROB API RUNNING on port ${PORT}`);
});
