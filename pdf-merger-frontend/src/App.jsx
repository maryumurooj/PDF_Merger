import React, { useState } from "react";
import { Upload, FileText, Download, Eye, X, Plus, Subtitles } from "lucide-react";
import "./App.css";

function App() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mergedBlob, setMergedBlob] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    setMergedBlob(null);
    setPdfs(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    if (files.length > 0) {
      setMergedBlob(null);
      setPdfs(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeFile = (index) => {
    setPdfs(pdfs.filter((_, i) => i !== index));
    setMergedBlob(null);
  };

  const handleMerge = async () => {
    if (pdfs.length < 2) {
      alert("Please select at least two PDFs.");
      return;
    }

    const formData = new FormData();
    pdfs.forEach((file) => formData.append("files", file));

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5095/PdfMerge/merge", {
        method: "POST",
        body: formData,
      });
      const blob = await response.blob();
      setMergedBlob(blob);
    } catch (err) {
      alert("Merge failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!mergedBlob) return;
    const url = URL.createObjectURL(mergedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "merged.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handlePreview = () => {
    if (!mergedBlob) return;
    const url = URL.createObjectURL(mergedBlob);
    window.open(url, "_blank");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="app-container">
      {/* Animated background elements */}
      <div className="bg-elements">
        <div className="bg-blur bg-blur-1"></div>
        <div className="bg-blur bg-blur-2"></div>
        <div className="bg-blur bg-blur-3"></div>
      </div>

      <div className="main-content">
        {/* Header */}
       
        <div className="header">
          <div className="header-icon">
            <FileText size={32} color="white" />
          </div>
          <h1>PDF Merger</h1>
          <p>Combine multiple PDFs into one seamless document</p>
        </div>

        {/* Upload Area */}
        <div className="glass-card">
          <div
            className={`upload-area ${dragOver ? "drag-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              multiple
              accept="application/pdf"
              onChange={handleFileChange}
              className="upload-input"
            />
            <div className="upload-content">
              <div className="upload-icon">
                <Upload size={32} color="white" />
              </div>
              <h3>Drop PDFs here or click to browse</h3>
              <p>Support for multiple PDF files</p>
            </div>
          </div>
        </div>

        {/* File List */}
        {pdfs.length > 0 && (
          <div className="glass-card">
            <div className="file-list">
              <h3>
                <FileText size={20} />
                Selected Files ({pdfs.length})
              </h3>
              {pdfs.map((pdf, i) => (
                <div key={i} className="file-item">
                  <div className="file-info">
                    <div className="file-icon">
                      <FileText size={20} color="white" />
                    </div>
                    <div className="file-details">
                      <div className="file-name">{pdf.name}</div>
                      <div className="file-size">{formatFileSize(pdf.size)}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    className="remove-btn"
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merge Button */}
        <button
          onClick={handleMerge}
          disabled={loading || pdfs.length < 2}
          className="btn btn-primary"
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Merging...
            </>
          ) : (
            <>
              <Plus size={20} />
              Merge PDFs
            </>
          )}
        </button>

        {/* Success State */}
        {mergedBlob && (
          <div className="glass-card">
            <div className="success-section">
              <div className="success-icon">
                <FileText size={32} color="white" />
              </div>
              <h3>Merge Complete!</h3>
              <p>Your PDF has been successfully merged</p>

              <div className="button-group">
                <button onClick={handleDownload} className="btn btn-success">
                  <Download size={20} />
                  Download
                </button>
                <button onClick={handlePreview} className="btn btn-secondary">
                  <Eye size={20} />
                  Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="subtitle">
          MARYUM UROOJ _ POC
        </div>
    </div>
  );
}

export default App;