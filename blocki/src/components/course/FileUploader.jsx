import React, { useState } from 'react';
import { Upload, CheckCircle, X } from 'lucide-react';
import { Spinner } from './LoadingComponents'; // Assuming Spinner is in LoadingComponents

const FileUploader = ({ onUploadComplete, assignmentTitle }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Successfully submitted ${uploadedFile.name} for ${assignmentTitle}`);
      setUploadedFile(null);
      if(onUploadComplete) onUploadComplete();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-900/20'
            : 'border-gray-600 hover:border-blue-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.zip"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={isSubmitting}
        />
        <label htmlFor="file-upload" className={isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}>
          <div className="flex flex-col items-center">
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <p className="text-lg font-medium mb-2 text-gray-100">
              {uploadedFile ? uploadedFile.name : 'Drop your file here or click to browse'}
            </p>
            <p className="text-sm text-gray-400">
              PDF, DOCX, or ZIP files only (Max: 10MB)
            </p>
          </div>
        </label>
      </div>

      {uploadedFile && (
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-green-500/20 text-green-300 border border-green-500/30">
          <div className="flex items-center overflow-hidden">
            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{uploadedFile.name}</span>
          </div>
          <button
            onClick={() => setUploadedFile(null)}
            className="text-green-300 hover:text-white transition-opacity flex-shrink-0 p-1 rounded-full hover:bg-white/10"
            disabled={isSubmitting}
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!uploadedFile || isSubmitting}
        className="w-full mt-4 px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 bg-blue-600 text-white hover:bg-blue-700"
      >
        {isSubmitting ? (
          <>
            <Spinner size="sm" variant="ring" className="text-white" />
            <span className="ml-2">Submitting...</span>
          </>
        ) : (
          'Submit Assignment'
        )}
      </button>
    </div>
  );
};

export default FileUploader;