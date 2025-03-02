import { useState } from "react";
import axios from "axios";

// File input component
function FileInput({ label, fileType, setFileType, onFileChange }) {
  return (
    <div className="mb-4 flex flex-col items-center bg-white p-4 shadow-md rounded-lg w-80">
      <label className="font-semibold mb-2">{label} ({fileType.toUpperCase()})</label>
      <select
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      >
        <option value="json">JSON</option>
        <option value="xml">XML</option>
      </select>
      <input
        type="file"
        accept={`.${fileType}`}
        onChange={onFileChange}
        className="p-2 border rounded w-full"
      />
    </div>
  );
}

// Main file uploader component
export default function FileUploader() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [fileType1, setFileType1] = useState("json");
  const [fileType2, setFileType2] = useState("xml");
  const [downloadUrl, setDownloadUrl] = useState("");

  // Handle file selection
  const handleFileChange = (e, fileNumber) => {
    if (fileNumber === 1) setFile1(e.target.files[0]);
    else setFile2(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file1 || !file2) {
      alert("Please upload both files");
      return;
    }
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob", 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Upload JSON and XML Files</h2>
      
      <FileInput label="File 1" fileType={fileType1} setFileType={setFileType1} onFileChange={(e) => handleFileChange(e, 1)} />
      <FileInput label="File 2" fileType={fileType2} setFileType={setFileType2} onFileChange={(e) => handleFileChange(e, 2)} />
      
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 mt-4 shadow-md"
      >
        Submit
      </button>
      
      {downloadUrl && (
        <a
          href={downloadUrl}
          download="processed_file.xml"
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-md"
        >
          Download Processed File
        </a>
      )}
    </div>
  );
}