import React, { useState } from 'react';

const FileUploadField = ({ label, name, file, verified, handleInputChange, handleVerify, documentType }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="flex items-center justify-center w-full h-10 px-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              name={name}
              onChange={(e) => handleInputChange(e, documentType)}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <span className="mr-2">📎</span>
            <span className="text-sm">
              {file ? file.name : 'Click to upload or drag and drop'}
            </span>
          </label>
        </div>
        {file && (
          <button
            onClick={() => handleVerify(documentType)}
            className={`px-4 py-2 rounded-lg ${
              verified ? 'bg-green-100' : 'bg-blue-100 hover:bg-blue-200'
            }`}
          >
            Verify
            {verified && (
              <span className="ml-2 text-green-600">✓ Verification Successful</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUploadField;