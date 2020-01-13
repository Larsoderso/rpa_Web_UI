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
import styled from "styled-components";

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

import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Select from "@atlaskit/select";
import InlineEdit from "@atlaskit/inline-edit";
import { colors } from "@atlaskit/theme";
import { DynamicTableStateless } from "@atlaskit/dynamic-table";

import PageHeader from "@atlaskit/page-header";
import axios from "axios";

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="use cases" key="Some project" />

    <BreadcrumbsItem text="New use case" key="Parent page" />
  </BreadcrumbsStateless>
);
const CustomTitleComponent = () => {
  return (
    <InlineEdit
      readView={() => <ReadView>Teamname</ReadView>}
      editView={(props, ref) => <EditView {...props} innerRef={ref} />}
      defaultValue="Teamname"
      onConfirm={() => {}}
    />
  );
};

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

function NewTeam() {
  // Send Login Credentials to Server

  const head = {
    cells: [
      {
        key: "name",
        content: "Team",
        isSortable: true
      },
      {
        key: "party",
        content: "E-Mail",
        shouldTruncate: true,
        isSortable: true
      },
      {
        key: "term",
        content: "Rolle",
        shouldTruncate: true,
        isSortable: true
      }
    ]
  };

  const isLoading = false;
  function createKey(input) {
    return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
  }

  const members = [
    {
      nm: "a",
      Team: "DTC Intern",
      mail: "john.doe@test.com",
      Role: "Admin"
    },
    {
      nm: "a",
      Team: "DTC Intern",
      mail: "Max.Mustermann@test.com",
      Role: "Team Member"
    }
  ];

  // Variablen
  const [anmloading, setanmloading] = useState(false);
  const [email, setemail] = useState("");
  const [pword, setpword] = useState("");

  const [newUserEmail, setnewUserMail] = useState("");

  const [description, setDescription] = useState("");
  const [memberList, updateMemberList] = useState([{ email: "test" }]);

  const actionsContent = (
    <ButtonGroup>
      <Button appearance="primary" onClick={postNewTeam}>
        Create
      </Button>
      <Link to="/ui/">
        {" "}
        <Button>Cancel</Button>
      </Link>
      <Button>...</Button>
    </ButtonGroup>
  );

  const rows = memberList.map((mem, index) => ({
    key: 1,
    cells: [
      {
        key: createKey(mem.email),
        content: <div>{mem.email}</div>
      },

      {
        content: <div>{mem.email}</div>
      },
      {
        content: <div>A</div>
      }
    ]
  }));
  function inviteNewUser() {
    var m = memberList;
    m.push({ email: newUserEmail });
    updateMemberList(m);
    setanmloading(true);

    console.log("memberlist", memberList);

    axios
      .get(
        `https://9001-f0b438fa-b62e-477b-a8bb-e37c54fcfe8a.ws-eu01.gitpod.io/invitation/` +
          newUserEmail
        // { user }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  function postNewTeam() {
    const data = {
      name: "test",
      description: description,
      members: memberList
    };
    axios
      .post(
        `https://jsonplaceholder.typicode.com/posts`,
        data
        // { user }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  function SendLoginCredentials() {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
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
      </PageHeader>{" "}
      <div>
        Description <br />
        <TextArea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <br />{" "}
        <div style={{ display: "flex" }}>
          <TextField
            value={newUserEmail}
            onChange={e => setnewUserMail(e.target.value)}
            type="E-Mail"
            placeholder="E-Mail"
            autoComplete="off"
          />
          <Button
            onClick={inviteNewUser}
            style={{ marginLeft: "12px", marginRight: "12px" }}
            type="button "
            appearance="primary"
          >
            Add User
          </Button>
        </div>
        <br />
        <br />
        <DynamicTableStateless head={head} rows={rows} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default NewTeam;
