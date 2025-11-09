// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { clerkMiddleware } = require('@clerk/express'); // ✅ Correct import
const bodyParser =require ('body-parser');

const connectDB = require('./config/db'); // Assuming db.js is in config folder
const movieRoutes = require('./routers/movieRoutes');
const showRoutes = require('./routers/ShowRouters');
const bookingRoutes = require('./routers/bookingRouters');
const adminRoutes = require('./routers/adminRoutes');
const userRoutes = require('./routers/userRouters');
const seatRoutes = require('./routers/seatRouters');
const favoriteRoutes = require("./routers/favoriteRoutes");
const theaterRoutes = require("./routers/theaterRoutes");
const router = require('./routers/paymentRoutes');
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigin = "http://localhost:5173";

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
// ✅ Clerk middleware - Apply globally if most routes need authentication
// For routes that don't need authentication, you can make them public explicitly
// or apply clerkMiddleware only to specific routes.
// For simplicity, applying globally here.
app.use(clerkMiddleware());

// Routes
app.use('/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/seats", seatRoutes); // seatRoutes and seatController are removed
app.use("/api/payments", require("./routers/paymentRoutes"));
app.use("/api/user/favorites", favoriteRoutes);
app.use("/api/admin/theaters", theaterRoutes);
app.use("/api/payment", router);
app.get('/', (req, res) => {
  res.send('🎬 Movie Ticket Backend is running');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
