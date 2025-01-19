const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filename
  },
});
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define a simple user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  kycStatus: { type: String, enum: ['Verified', 'Pending'], required: true },
});

const User = mongoose.model('User', userSchema);

// Route for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Assuming the file is in JSON format, you can adjust based on your file format
    const fileData = require(path.join(__dirname, req.file.path));

    // Process the file data and save it to MongoDB
    await User.insertMany(fileData); // Assuming fileData is an array of user objects

    res.status(200).json({ message: 'File uploaded and data saved to MongoDB' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing file' });
  }
});

// Route for getting user data (to display in the frontend)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
