import express from 'express';
import cors from 'cors';
import CryptoJS from 'crypto-js';

const app = express();
const port = process.env.PORT || 3000;

const accessKey = process.env.LIBLIB_ACCESS_KEY;
const secretKey = process.env.LIBLIB_SECRET_KEY;

app.use(cors());

app.get('/generate-signature', (req, res) => {
  if (!accessKey || !secretKey) {
    return res.status(500).json({ error: 'AccessKey or SecretKey not set in env' });
  }

  const timestamp = Date.now().toString();
  const nonce = Math.random().toString(36).substring(2, 12);

  const payload = `AccessKey=${accessKey}&SignatureNonce=${nonce}&Timestamp=${timestamp}`;
  const signature = CryptoJS.HmacSHA256(payload, secretKey).toString();

  res.json({
    AccessKey: accessKey,
    Timestamp: timestamp,
    SignatureNonce: nonce,
    Signature: signature
  });
});

app.listen(port, () => {
  console.log(`✅ LiblibAI Signature server is running on port ${port}`);
});
