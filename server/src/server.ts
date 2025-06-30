import { config } from 'dotenv';
config(); // ✅ MUST be before any process.env access

import app from './app';
import { mongoconnect } from './utils/db';

const PORT = process.env.PORT || 3000;

mongoconnect(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});



