      

const app       = require('./src/app');     
const connectDB = require('./src/config/db'); 


require('dotenv').config();    


const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();                     
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);                      
  }
})();
