const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    // Do something with the uploaded file, like saving it or processing it
    // For now, just return the filename
    res.json({ filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
