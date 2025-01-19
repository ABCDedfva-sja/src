import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;
      const fileSize = selectedFile.size;

      // Restrict file formats to PDF, JPG, PNG
      if (fileType !== "application/pdf" && !fileType.startsWith("image/")) {
        setError("Please upload a PDF, JPG, or PNG file.");
        setFile(null);
        setFilePreview(null);
        return;
      }

      // Restrict file size (for example, to 5MB)
      if (fileSize > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB.");
        setFile(null);
        setFilePreview(null);
        return;
      }

      // Clear previous error and set file
      setError("");
      setFile(selectedFile);

      // For images (JPG, PNG), show preview
      if (fileType.startsWith("image/")) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          setFilePreview(fileReader.result);
        };
        fileReader.readAsDataURL(selectedFile);
      }
    }
  };

  // Handle file upload (simulated)
  const handleUpload = () => {
    // Simulate file upload success
    setTimeout(() => {
      alert("File uploaded successfully!");
      navigate("/dashboard"); // Redirect to the dashboard after upload
    }, 1000);
  };

  return (
    <div className="upload-container">
      <h2>Upload KYC Document</h2>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* File Upload Form */}
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf, .jpg, .jpeg, .png"
      />

      {/* Image Preview */}
      {filePreview && filePreview.startsWith("data:image/") && (
        <div className="file-preview">
          <h4>Image Preview:</h4>
          <img
            src={filePreview}
            alt="Uploaded Preview"
            style={{ width: "200px", height: "auto" }}
          />
        </div>
      )}

      {/* For Images, show the file name */}
      {file && !filePreview && file.type !== "application/pdf" && (
        <div className="file-info">
          <h4>File Uploaded:</h4>
          <p>{file.name}</p>
        </div>
      )}

      {/* Button to simulate upload */}
      <button disabled={!file} onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default Upload;
