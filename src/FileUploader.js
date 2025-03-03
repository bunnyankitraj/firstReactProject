import { useState } from "react";
import axios from "axios";

function FileInput({ label, fileType, setFileType, onFileChange }) {
    return (
        <div>
            <label>{label} ({fileType.toUpperCase()})</label>
            <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
            >
                <option value="json">JSON</option>
                <option value="xml">XML</option>
            </select>
            <input
                type="file"
                accept={`.${fileType}`}
                onChange={onFileChange}
            />
        </div>
    );
}

export default function FileUploader() {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [fileType1, setFileType1] = useState("json");
    const [fileType2, setFileType2] = useState("xml");
    const [downloadUrl, setDownloadUrl] = useState("");

    const handleFileChange = (e, fileNumber) => {
        if (fileNumber === 1) setFile1(e.target.files[0]);
        else setFile2(e.target.files[0]);
    };

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
        <div>
            <h2>Upload JSON and XML Files</h2>
            
            <FileInput label="File 1" fileType={fileType1} setFileType={setFileType1} onFileChange={(e) => handleFileChange(e, 1)} />
            <FileInput label="File 2" fileType={fileType2} setFileType={setFileType2} onFileChange={(e) => handleFileChange(e, 2)} />
            
            <button onClick={handleUpload}>
                Submit
            </button>
            
            {downloadUrl && (
                <a href={downloadUrl} download="processed_file.xml">
                    Download Processed File
                </a>
            )}
        </div>
    );
}
