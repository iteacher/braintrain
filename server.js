const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app's build directory
app.use('/braintrain/build', express.static(path.join(__dirname, 'build')));
app.use('/braintrain/static', express.static(path.join(__dirname, 'build/static')));
app.use('/braintrain/js', express.static(path.join(__dirname, 'build/static/js')));
app.use('/braintrain/css', express.static(path.join(__dirname, 'build/static/css')));
app.use('/braintrain/styles', express.static(path.join(__dirname, 'build/static/styles')));

// Serve static files from the public directory
app.use('/braintrain', express.static(path.join(__dirname, 'public')));

// Catch-all route
app.get('/braintrain/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Activate the node
app.listen(() => {
    console.log('Server is running.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

