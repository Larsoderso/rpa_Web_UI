import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import TableTree from "@atlaskit/table-tree";
import { DynamicTableStateless } from "@atlaskit/dynamic-table";
import FolderFilledIcon from "@atlaskit/icon/glyph/folder-filled";
import FileIcon from "@atlaskit/icon/glyph/file";
function MyDropzone(props) {
  const Title = (props: ExampleItemData) => <span>{props.title}</span>;
  const Numbering = (props: ExampleItemData) => <span>{props.numbering}</span>;

  const fileList = [{}, {}];
  const isLoading = false;
  const head = {
    cells: [
      {
        key: "name",
        content: "Name"
      },
      {
        key: "party",
        content: "Filesize"
      },
      {
        key: "party",
        content: "Created"
      }
    ]
  };

  const rows = props.props.files.map((file, index) => ({
    key: 1,
    cells: [
      {
        content: (
          <div style={{ display: "flex" }}>
            <FileIcon />{" "}
            <div style={{ paddingLeft: "12px", lineHeight: "20px" }}>
              {file.Filename}
            </div>
          </div>
        )
      },

      {
        content: <div>128KB</div>
      },
      {
        content: <div>{new Date(file.Created).toLocaleDateString("de-De")}</div>
      }
    ]
  }));

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    // Do something with the files
    const data = new FormData();
    data.append("file", acceptedFiles[0]);
    axios
      .post(
        "https://api.rpa.rocks/uc/" + props.props.usecase + "/files",
        data,
        {
          // receive two    parameter endpoint url ,form data
        }
      )
      .then(() => {
        props.uploadedFiles();
      });
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
        width: "94%"
      }}
      {...getRootProps({ onClick: event => event.stopPropagation() })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ... {props.usecase}</p>
      ) : (
        <div>
          <DynamicTableStateless
            head={head}
            rows={rows}
            isLoading={isLoading}
          />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </div>
  );
}

export default MyDropzone;
