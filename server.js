const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Configure CORS
const corsOptions = {
  origin: 'https://honeycomintranets.co.uk', // Only allow requests from this origin
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve static files from the public directory
app.use('/static',express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the React app's index.html for any other routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});