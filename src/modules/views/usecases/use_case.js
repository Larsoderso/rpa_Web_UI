import React, { Component, Fragment, useState } from "react";
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

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="Use Cases" key="Some project" />
    <BreadcrumbsItem text="Excel Data Import" key="Parent page" />
  </BreadcrumbsStateless>
);

const actionsContent = (
  <ButtonGroup>
    <Button appearance="primary">Update</Button>
    <Link to="/ui/">
      {" "}
      <Button appearance="danger">Delete</Button>
    </Link>
    <Button>...</Button>
  </ButtonGroup>
);

function SingleUseCase() {
  // Send Login Credentials to Server
  let { path, url } = useRouteMatch();

  // Variablen
  const [anmloading, setanmloading] = useState(false);
  const [email, setemail] = useState("");
  const [pword, setpword] = useState("");

  const [status, setStatus] = useState("Idea");

  function SendLoginCredentials() {
    setanmloading(true);

    const user = {
      mail: email,
      password: pword
    };

    axios
      .get(
        `https://9001-f0b438fa-b62e-477b-a8bb-e37c54fcfe8a.ws-eu01.gitpod.io/`
        // { user }
      )
      .then(res => {
        setanmloading(false);
        console.log(res);
        console.log(res.data);
      });
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
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
              trigger="Status"
              triggerType="button"
              onOpenChange={e => console.log("dropdown opened", e)}
            >
              <DropdownItemRadio Icon id="Idwa">
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
            <div style={{ height: "calc(100vh - 150px)" }}>
              <Comment
                avatar={<Avatar label="Atlaskit avatar" size="medium" />}
                author={<CommentAuthor>John Smith</CommentAuthor>}
                time={<CommentTime>30 August, 2016</CommentTime>}
                content={
                  <p>
                    Content goes here. This can include{" "}
                    <a href="/link">links</a> and other content.
                  </p>
                }
                actions={[]}
              />

              <Comment
                avatar={<Avatar label="Atlaskit avatar" size="medium" />}
                author={<CommentAuthor>John Smith</CommentAuthor>}
                time={<CommentTime>30 August, 2016</CommentTime>}
                content={
                  <p>
                    Content goes here. This can include{" "}
                    <a href="/link">links</a> and other content.
                  </p>
                }
                actions={[]}
              />
              <Comment
                avatar={<Avatar label="Atlaskit avatar" size="medium" />}
                author={<CommentAuthor>John Smith</CommentAuthor>}
                time={<CommentTime>30 August, 2016</CommentTime>}
                content={
                  <p>
                    Content goes here. This can include{" "}
                    <a href="/link">links</a> and other content.
                  </p>
                }
                actions={[]}
              />
            </div>

            <div style={{ height: "150px", background: "#ecf1f3" }}>
              <div
                style={{
                  boxSizing: "border-box",
                  paddingLeft: "12px",
                  paddingRight: "12px"
                }}
              >
                <TextArea resize="auto" name="area" isCompact />

                <ButtonGroup
                  appearance="primary"
                  style={{ paddingTop: "12px" }}
                >
                  <Button appearance="default">First Button</Button>
                  <Button>Second Button</Button>
                  <Button>Third Button</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUseCase;
