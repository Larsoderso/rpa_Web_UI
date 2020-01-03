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

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="use cases" key="Some project" />

    <BreadcrumbsItem text="New use case" key="Parent page" />
  </BreadcrumbsStateless>
);
const actionsContent = (
  <ButtonGroup>
    <Button appearance="primary">Create</Button>
    <Link to="/ui/">
      {" "}
      <Button>Cancel</Button>
    </Link>
    <Button>...</Button>
  </ButtonGroup>
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
  const [email, setemail] = useState("");
  const [pword, setpword] = useState("");

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
        <CustomTitleComponent />
      </PageHeader>
      <div>
        Description <br />
        <TextArea placeholder="Describe your Use Case" />
        <br />
        Team
        <br />
        <UserPicker
          placeholder="Enter Team"
          fieldId="example"
          options={[{ name: "Team A", value: "a" }]}
          onChange={console.log}
          onInputChange={onInputChange}
        />
        <br />
        <br />
        <EvaluationItem question="Question 1" bottom={1} top={200} />
        <EvaluationItem question="Question 2" bottom={10} top={50} />
        <EvaluationItem question="Question 3" bottom={5} top={10} />
        <br />
      </div>
    </div>
  );
}

export default NewUseCase;
