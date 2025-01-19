const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // Process the file (e.g., OCR or parsing)
  res.json({
    message: "File uploaded successfully!",
    filename: req.file.originalname,
  });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
