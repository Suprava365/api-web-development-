// 

// const express = require('express');
// const cors = require("cors");
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// module.exports = app;




const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const hostelRoutes = require('./routes/hostelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const feeRoutes = require('./routes/feeRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const mealRoutes = require('./routes/mealRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const reportRoutes = require('./routes/reportRoutes');


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authRoutes)
app.use('/api/hostels', hostelRoutes); 
app.use('/api/bookings', bookingRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/reports', reportRoutes);

module.exports = app;
 
