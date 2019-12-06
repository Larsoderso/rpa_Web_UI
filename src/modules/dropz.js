import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={{
        borderRadius: "4px",
        background: "#f1f7f96b",
        border: "1px solid #e3e9ef",
        margin: "16px 0",
        padding: "22px",
        marginLeft: "12px",
        width: "98%"
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default MyDropzone;
