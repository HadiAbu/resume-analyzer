import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

type FileUploaderProps = {
  onFileSelect?: (file: File | null) => void;
};

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 20 * Math.pow(1024, 2),
    accept: { "application/pdf": [".pdf"] },
  });
  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="w-full cursor-pointer">
          {file ? (
            <div
              className="uploader-selected-file "
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="pdf" className="w-4 h-4" />
              <div className="flex items-center ">
                <div>
                  <p className="text-lg font-medium truncate">{file.name}</p>
                  <p className="text-sm truncate">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  onFileSelect?.(null);
                }}
              >
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <p className="tex-lg">
                <span className="semi-bold">Click to upload</span> or Drag and
                Drop!
              </p>
              <p className="">PDF (max 20MB)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
