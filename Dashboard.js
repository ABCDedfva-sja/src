import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation();

  // State to manage documents
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  // State for filters
  const [filterType, setFilterType] = useState("");
  const [filterExpiry, setFilterExpiry] = useState(false);
  const [filterLastSixMonths, setFilterLastSixMonths] = useState(false);

  useEffect(() => {
    // Add newly uploaded document to the documents list
    if (location.state?.uploadedDoc) {
      setDocuments((prevDocs) => [...prevDocs, location.state.uploadedDoc]);
    }
  }, [location.state]);

  useEffect(() => {
    // Filter logic
    let filtered = [...documents];

    // Filter by type
    if (filterType) {
      filtered = filtered.filter((doc) => doc.type === filterType);
    }

    // Filter documents about to expire in the next 30 days
    if (filterExpiry) {
      const currentDate = new Date();
      const expiryThreshold = new Date(
        currentDate.setDate(currentDate.getDate() + 30)
      );
      filtered = filtered.filter(
        (doc) => new Date(doc.expiryDate) <= expiryThreshold
      );
    }

    // Filter documents uploaded in the last 6 months
    if (filterLastSixMonths) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      filtered = filtered.filter(
        (doc) => new Date(doc.uploadDate) >= sixMonthsAgo
      );
    }

    setFilteredDocuments(filtered);
  }, [filterType, filterExpiry, filterLastSixMonths, documents]);

  return (
    <div>
      {/* Navbar */}
      <header>
        <nav className="navbar"></nav>
      </header>

      {/* Dashboard Content */}
      <main>
        <div className="dashboard-content">
          <h1>User Dashboard</h1>

          {/* Filters */}
          <div className="filters">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Filter by Document Type</option>
              <option value="Aadhaar">Aadhaar</option>
              <option value="Driving License">Driving License</option>
              <option value="PAN">PAN</option>
            </select>

            <label>
              <input
                type="checkbox"
                checked={filterExpiry}
                onChange={(e) => setFilterExpiry(e.target.checked)}
              />
              About to Expire (Next 30 Days)
            </label>

            <label>
              <input
                type="checkbox"
                checked={filterLastSixMonths}
                onChange={(e) => setFilterLastSixMonths(e.target.checked)}
              />
              Uploaded in Last 6 Months
            </label>
          </div>

          {/* Uploaded Documents */}
          <h2>Uploaded Documents</h2>
          <table className="document-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Type</th>
                <th>Upload Date</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.name}</td>
                    <td>{doc.type}</td>
                    <td>{doc.uploadDate}</td>
                    <td>{doc.expiryDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No documents match the filters</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
