const express = require('express');
require('dotenv/config');
const connectDB = require('./config/db');
const { clerkMiddleware } = require('@clerk/express');

const { serve } = require("inngest/express");
const { inngest, syncUserCreation } = require("./inngest");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();
app.use(clerkMiddleware());

app.get('/', (req, res) => {
  res.send("This is from server");
});

app.use('/api/inngest', serve({ client: inngest, functions: [syncUserCreation] }));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
