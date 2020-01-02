import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import TableTree from "@atlaskit/table-tree";

function MyDropzone() {
  type ExampleItemData = { title: string, numbering: string };

  const Title = (props: ExampleItemData) => <span>{props.title}</span>;
  const Numbering = (props: ExampleItemData) => <span>{props.numbering}</span>;

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    // Do something with the files
    const data = new FormData();
    data.append("file", acceptedFiles[0]);

    axios.post("http://3.120.144.200:8080/upload", data, {
      // receive two    parameter endpoint url ,form data
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
        <p>Drop the files here ...</p>
      ) : (
        <div>
          <TableTree
            style={{ width: "580px" }}
            headers={["Title", "Numbering"]}
            columns={[Title, Numbering]}
            columnWidths={["200px", "200px"]}
            items={[
              {
                id: "1",
                content: {
                  title: "First top-level entry",
                  numbering: "1"
                },
                hasChildren: true,
                children: [
                  {
                    id: "1.1.",
                    content: {
                      title: "First child",
                      numbering: "1.1"
                    },
                    hasChildren: false
                  },
                  {
                    id: "1.2",
                    content: {
                      title: "Second child",
                      numbering: "1.2"
                    },
                    hasChildren: true,
                    children: [
                      {
                        id: "1.2.1",
                        content: {
                          title: "First grandchild",
                          numbering: "1.2.1"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                id: "2",
                content: {
                  title: "Second top-level entry",
                  numbering: "2"
                },
                hasChildren: false
              }
            ]}
          />{" "}
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </div>
  );
}

export default MyDropzone;
