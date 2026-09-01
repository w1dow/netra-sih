const express = require('express');
const cors = require('cors');
const { initDB } = require('./db');

const tendersRoutes = require('./routes/tenders');
const bidsRoutes = require('./routes/bids');
const complianceRoutes = require('./routes/compliance');
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const notificationsRoutes = require('./routes/notifications');
const newsRoutes = require('./routes/news');
const calendarRoutes = require('./routes/calendar');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Initialize Database connection / in-memory fallback
initDB();

// API Routes
app.use('/api/tenders', tendersRoutes);
app.use('/api/bids', bidsRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/calendar', calendarRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'NETRA Procurement Platform Express Backend',
    version: '1.0.0',
    endpoints: [
      '/api/tenders',
      '/api/bids',
      '/api/compliance',
      '/api/auth',
      '/api/company',
      '/api/notifications',
      '/api/news',
      '/api/calendar'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`  NETRA Express Backend running on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/`);
  console.log(`===================================================`);
});