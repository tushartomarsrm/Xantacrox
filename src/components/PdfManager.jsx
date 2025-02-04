import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFile,
  FaTrash,
  FaDownload,
} from "react-icons/fa";

const FileStorageSystem = () => {
  const [folders, setFolders] = useState(["cv", "docs", "resumes", "writeUps"]);
  const [files, setFiles] = useState({});
  const [fileData, setFileData] = useState({ customName: "", file: null });
  const [currentFolder, setCurrentFolder] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/");
      setFiles(data.files || {});
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };
  const handleFileDownload = async (folder, fileName) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/download/${folder}/${fileName}`,
        {
          responseType: "blob", // Indicates binary data (for file downloads)
        }
      );

      // Create a Blob from the response
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName; // File name for the download
      link.click();
      showToast(`File "${fileName}" downloaded successfully!`, "success");
    } catch (error) {
      showToast("Failed to download file. Try again.", "error");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("folder", currentFolder);
    formData.append("customName", fileData.customName);
    formData.append("file", fileData.file);

    try {
      await axios.post("http://localhost:3000/upload", formData);
      showToast("File uploaded successfully!", "success");
      fetchFiles();
      setFileData({ customName: "", file: null });
      setIsDialogOpen(false);
    } catch (error) {
      showToast("Failed to upload file. Try again.", "error");
    }
  };

  const deleteFile = async (folder, fileName) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${folder}/${fileName}`);
      showToast(`File "${fileName}" deleted successfully!`, "success");
      fetchFiles();
    } catch (error) {
      showToast("Failed to delete file. Try again.", "error");
    }
  };

  const getFileIcon = (file) => {
    const ext = file.split(".").pop();
    if (ext === "pdf") return <FaFilePdf className="text-red-500 text-xl" />;
    if (["doc", "docx"].includes(ext))
      return <FaFileWord className="text-blue-500 text-xl" />;
    if (["jpg", "png"].includes(ext))
      return <FaFileImage className="text-green-500 text-xl" />;
    return <FaFile className="text-gray-500 text-xl" />;
  };

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Upload Documents
      </h1>

      {folders.map((folder) => (
        <div key={folder} className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 capitalize">
            {folder}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {files[folder]?.length > 0 ? (
              files[folder].map((file) => (
                <div
                  key={file}
                  className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition"
                >
                  <div className="flex items-center space-x-4">
                    {getFileIcon(file)}
                    <p className="font-medium text-gray-800 truncate">{file}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => deleteFile(folder, file)}
                    >
                      <FaTrash />
                    </button>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default behavior of anchor tag
                        handleFileDownload(folder, file); // Trigger custom download logic
                      }}
                      className="text-green-500 hover:text-green-700 transition"
                    >
                      <FaDownload />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No files in this folder. Upload some files!
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setCurrentFolder(folder);
              setIsDialogOpen(true);
            }}
            className="mt-6 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Upload File
          </button>
        </div>
      ))}

      {/* Upload File Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-96 p-6">
            <h3 className="text-xl font-bold mb-4">
              Upload File to {currentFolder}
            </h3>
            <form onSubmit={handleFileUpload}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  File Name
                </label>
                <input
                  type="text"
                  placeholder="Enter a custom name"
                  value={fileData.customName}
                  onChange={(e) =>
                    setFileData({ ...fileData, customName: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFileData({ ...fileData, file: e.target.files[0] })
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default FileStorageSystem;
