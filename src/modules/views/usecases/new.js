import React, { Component, Fragment, useState } from "react";
import styled from "styled-components";

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
import UserPicker from "@atlaskit/user-picker";

import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Select from "@atlaskit/select";
import InlineEdit from "@atlaskit/inline-edit";
import { colors } from "@atlaskit/theme";

import PageHeader from "@atlaskit/page-header";
import EvaluationItem from "../../components/evaluation";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="use cases" key="Some project" />

    <BreadcrumbsItem text="New use case" key="Parent page" />
  </BreadcrumbsStateless>
);

const ReadView = styled.div`
  font-size: 24px;
  font-weight: 500;
  display: flex;
  max-width: 100%;
  overflow: hidden;
  padding: 8px 6px;
`;

const EditView = styled.input`
  font-size: 24px;
  font-weight: 500;
  box-sizing: border-box;
  cursor: inherit;
  outline: none;
  padding: 6px 6px;
  width: 100%;
  border: 2px solid ${colors.N40};
  border-radius: 3px;

  :focus {
    border: 2px solid ${colors.B100};
  }
`;

const CustomTitleComponent = () => {
  return (
    <InlineEdit
      readView={() => <ReadView>Name the use case</ReadView>}
      editView={(props, ref) => <EditView {...props} innerRef={ref} />}
      defaultValue="Name the use case"
      onConfirm={() => {}}
    />
  );
};

function NewUseCase() {
  // Send Login Credentials to Server

  // Variablen
  const [anmloading, setanmloading] = useState(false);
  const [name, setname] = useState("Name the use case");
  const [description, setdescription] = useState("");
  const [team, setteam] = useState("");

  const actionsContent = (
    <ButtonGroup>
      <Button appearance="primary" onClick={CreateUseCase}>
        Create
      </Button>
      <Link to="/ui/">
        {" "}
        <Button>Cancel</Button>
      </Link>
      <Button>...</Button>
    </ButtonGroup>
  );

  function CreateUseCase() {
    setanmloading(true);

    const data = {
      name: name,
      description: description,
      team: team
    };

    axios
      .post(
        `https://jsonplaceholder.typicode.com/posts`,
        data
        // { user }
      )
      .then(res => {
        toast.notify("Hello world!");
        console.log(res);
        console.log(res.data);
      });
  }

  function onInputChange() {}
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        paddingLeft: "22px",
        paddingRight: "22px"
      }}
    >
      <PageHeader
        breadcrumbs={breadcrumbs}
        actions={actionsContent}
        disableTitleStyles
      >
        <InlineEdit
          readView={() => <ReadView>{name}</ReadView>}
          editView={(props, ref) => <EditView {...props} innerRef={ref} />}
          defaultValue={name}
          onConfirm={(value, analyticsEvent) => {
            setname(value);
          }}
        />{" "}
      </PageHeader>
      <div>
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
        <br />
        <br />
        <EvaluationItem question="Question 1" bottom={1} top={10} />
        <EvaluationItem question="Question 2" bottom={1} top={10} />
        <EvaluationItem question="Question 3" bottom={1} top={10} />
        <br />
      </div>
    </div>
  );
}

export default NewUseCase;
