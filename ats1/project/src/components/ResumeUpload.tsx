import React, { useCallback } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { ResumeUploadProps } from '../types/types';

const ResumeUpload: React.FC<ResumeUploadProps> = ({ files, setFiles }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = validateFiles(newFiles);
      setFiles([...files, ...validFiles]);
    }
  };

  const validateFiles = (newFiles: File[]) => {
    return newFiles.filter(file => {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      return fileType === 'pdf' || fileType === 'docx' || fileType === 'doc';
    });
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      const validFiles = validateFiles(newFiles);
      setFiles([...files, ...validFiles]);
    }
  }, [files, setFiles]);

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const color = ext === 'pdf' ? 'text-red-500' : 'text-blue-500';
    return <FileText className={`h-4 w-4 ${color}`} />;
  };

  return (
    <div className="h-full">
      <div className="flex items-center mb-4">
        <div className="bg-primary-100 p-2 rounded-lg">
          <Upload className="h-5 w-5 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 ml-3">Resume Upload</h3>
      </div>

      <div 
        className="h-[calc(100%-4rem)] border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all duration-200"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input
          type="file"
          id="fileInput"
          multiple
          accept=".pdf,.docx,.doc"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload resumes"
        />
        
        {files.length === 0 ? (
          <div className="text-center">
            <Upload className="h-12 w-12 text-primary-500 mx-auto mb-4 animate-bounce-slow" />
            <p className="text-gray-700 font-medium mb-2">Drag and drop resume files here</p>
            <p className="text-gray-500 text-sm mb-3">Or click to browse</p>
            <p className="text-xs text-gray-400">Supported formats: PDF, DOCX, DOC</p>
          </div>
        ) : (
          <div className="w-full">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Files ({files.length})</h4>
            <div className="max-h-[calc(100%-2rem)] overflow-y-auto space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center">
                    {getFileIcon(file.name)}
                    <span className="ml-2 text-sm truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length === 0 && (
          <div className="mt-4 flex items-start p-3 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-xs">
              No resumes uploaded yet. Please upload at least one resume to analyze candidates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;