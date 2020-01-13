import React, { Component, Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import Button, { ButtonGroup } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import TextArea from "@atlaskit/textarea";

import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage
} from "@atlaskit/form";
import { Checkbox } from "@atlaskit/checkbox";
import PublicHeader from "./../navigation/header_outside";
import axios from "axios";
import Avatar from "@atlaskit/avatar";
import MyDropzone from "./../../dropz";
//import axios from "axios";
import Comment, {
  CommentAuthor,
  CommentTime,
  CommentAction,
  CommentEdited
} from "@atlaskit/comment";

import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";

import PageHeader from "@atlaskit/page-header";
import DropdownMenu, {
  DropdownItemGroupRadio,
  DropdownItemRadio
} from "@atlaskit/dropdown-menu";

import "../../../../node_modules/react-vis/dist/style.css";
import {
  FlexibleWidthXYPlot,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries
} from "react-vis";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import UserPicker from "@atlaskit/user-picker";
import EvaluationItem from "../../components/evaluation";

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="Use Cases" key="Some project" />
    <BreadcrumbsItem text="Excel Data Import" key="Parent page" />
  </BreadcrumbsStateless>
);

function getAdorableAvatar(id: string, size: number = 80) {
  return `https://api.adorable.io/avatars/${size}/${id}.png`;
}
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
function SingleUseCase(props) {
  // Send Login Credentials to Server
  //let { path, url } = useRouteMatch(props);

  // Variablen
  const [anmloading, setanmloading] = useState(false);
  const [email, setemail] = useState("");
  const [pword, setpword] = useState("");

  const [status, setStatus] = useState("Idea");

  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setupdateModal] = useState(false);
  const [name, setname] = useState("Name the use case");
  const [description, setdescription] = useState("");
  const [team, setteam] = useState("");

  const [parsedJWT, setJWT] = useState(false);
  const [comments, setComments] = useState([
    { Author: "user@rpa.rocks", text: "tesckoooomentar" }
  ]);

  const [commentBox, setCommentbox] = useState("");
  useEffect(() => setJWT(parseJwt(localStorage.getItem("knock"))), []);
  useEffect(() => getComments(), []);

  const actions = [
    {
      text: "Cancel",
      appearance: "default",
      onClick: () => setDeleteModal(false)
    },
    {
      text: "Delete Use Case",
      appearance: "danger",
      onClick: () => console.log("hey")
    }
  ];

  const actions_update = [
    {
      text: "Cancel",
      appearance: "default",
      onClick: () => setupdateModal(false)
    },
    {
      text: "Update use case",
      appearance: "primary",
      onClick: () => console.log("hey")
    }
  ];

  const actionsContent = (
    <ButtonGroup>
      <Button onClick={() => setupdateModal(true)} appearance="primary">
        Update
      </Button>{" "}
      {parsedJWT.role == "admin" && (
        <Button onClick={() => setDeleteModal(true)} appearance="danger">
          Delete
        </Button>
      )}
      <Button>...</Button>
    </ButtonGroup>
  );

  function getComments() {
    console.log("--- Load comments----");
    axios
      .get(
        `https://7080-fb9537d9-26b2-4e22-a59c-3c743b0f5499.ws-eu01.gitpod.io/uc/1/comments`
        // { user }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);

        setComments(res.data);
      });
  }

  function newComment() {
    const d = {
      text: commentBox,
      author: 1,
      usecase: 1
    };
    axios
      .post(
        `https://7080-fb9537d9-26b2-4e22-a59c-3c743b0f5499.ws-eu01.gitpod.io/uc/1/comments`,
        d
        // { user }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
        getComments();
      });
  }
  function changeStatus(val) {
    setStatus(val);
    const d = {
      status: status
    };
    axios
      .put(
        `https://jsonplaceholder.typicode.com/posts/1`,
        status
        // { user }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  function getFiles() {}
  function onInputChange() {}

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <ModalTransition>
        {deleteModal && (
          <Modal
            actions={actions}
            onClose={() => setDeleteModal(false)}
            heading="Do you really want to delete the use case ?"
          />
        )}
      </ModalTransition>

      <ModalTransition>
        {updateModal && (
          <Modal
            width="large"
            actions={actions_update}
            onClose={() => setupdateModal(false)}
            heading="Update use case"
          >
            {" "}
            <div>
              Name <br />
              <TextField
                placeholder="Describe your Use Case"
                value={description}
                onChange={e => {
                  setdescription(e.target.value);
                }}
              />
              <br />
              Description <br />
              <TextArea
                placeholder="Describe your Use Case"
                value={description}
                onChange={e => {
                  setdescription(e.target.value);
                }}
              />
              <br />
              Team
              <br />
              <UserPicker
                placeholder="Enter Team"
                value={team}
                fieldId="example"
                options={[{ name: "Team A", value: "TEAM A" }]}
                onChange={(value, action) => {
                  setteam(value);
                }}
                onInputChange={onInputChange}
              />
            </div>
            <EvaluationItem question="Question 1" bottom={1} top={10} />
            <EvaluationItem question="Question 1" bottom={1} top={10} />
            <EvaluationItem question="Question 1" bottom={1} top={10} />
            <EvaluationItem question="Question 1" bottom={1} top={10} />
          </Modal>
        )}
      </ModalTransition>

      <div
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "6fr 2fr",
          gap: "12px 32px",
          overflow: "hidden"
        }}
      >
        <div>
          <div style={{ paddingLeft: "12px" }}>
            <PageHeader breadcrumbs={breadcrumbs} actions={actionsContent}>
              Excel Data Import{" "}
            </PageHeader>
          </div>
          <div style={{ padding: "12px" }}>
            <DropdownMenu
              trigger="status"
              triggerType="button"
              onItemActivated={item => {
                // you can do allthethings here!
                console.log(item);
              }}
            >
              <DropdownItemRadio
                onClick={item => {
                  // you can do allthethings here!
                  console.log(item);
                }}
                Icon
                id="Idwa"
              >
                Idea
              </DropdownItemRadio>
              <DropdownItemRadio id="austin">Concept</DropdownItemRadio>
              <DropdownItemRadio id="Development">
                Development
              </DropdownItemRadio>

              <DropdownItemRadio id="austin">Testing</DropdownItemRadio>
              <DropdownItemRadio id="austin">Operation</DropdownItemRadio>
            </DropdownMenu>
          </div>

          <div style={{ paddingLeft: "12px" }}>
            <div style={{ fontSize: "20px", color: "#42526d" }}>Evaluation</div>

            <FlexibleWidthXYPlot height={300}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <MarkSeries
                className="mark-series-example"
                strokeWidth={2}
                opacity="0.8"
                sizeRange={[5, 15]}
                data={[
                  { x: -1, y: 10, size: 30 },
                  { x: 1.7, y: 12, size: 10 },
                  { x: 2, y: 5, size: 1 },
                  { x: 3, y: 15, size: 12 },
                  { x: 2.5, y: 7, size: 4 }
                ]}
              />
            </FlexibleWidthXYPlot>

            <div style={{ fontSize: "20px", color: "#42526d" }}>Files</div>
          </div>
          <MyDropzone />
        </div>
        <div style={{ background: "#f1f7f9", width: "100%", height: "100vh" }}>
          <div
            style={{
              background: "rgb(241, 247, 249)",
              width: "100%",
              height: "100vh",
              paddingLeft: "12px",
              paddingTop: "22px"
            }}
          >
            <div style={{ height: "calc(100vh - 150px)", overflowY: "scroll" }}>
              {comments.map(function(object, i) {
                return (
                  <Comment
                    avatar={
                      <Avatar
                        label="Atlaskit avatar"
                        size="medium"
                        src={getAdorableAvatar(object.Author)}
                      />
                    }
                    author={<CommentAuthor>{object.Author}</CommentAuthor>}
                    time={
                      <CommentTime>
                        {new Date(object.Date).toLocaleDateString("de-DE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric"
                        })}
                      </CommentTime>
                    }
                    content={<p>{object.Text}</p>}
                    actions={[]}
                  />
                );
              })}
            </div>

            <div style={{ height: "150px", background: "#ecf1f3" }}>
              <div
                style={{
                  boxSizing: "border-box",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  marginLeft: "-12px"
                }}
              >
                <TextArea
                  value={commentBox}
                  onChange={e => setCommentbox(e.target.value)}
                  resize="auto"
                  height="120px"
                  name="area"
                  isCompact
                />
                <div style={{ paddingTop: "12px" }}>
                  <ButtonGroup style={{ paddingTop: "12px" }}>
                    <Button
                      onClick={() => setCommentbox("")}
                      appearance="default"
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => newComment()} appearance="primary">
                      Post comment
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUseCase;
