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
import UserPicker from "@atlaskit/user-picker";

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
    <div style={{ display: "flex", height: "100vh" }}>
      New Use Case
      <div>
        Name des Use Cases
        <TextField placeholder="Choose a name for your use case" />
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
        <Button appearance="disabled">Cancel</Button>
        <Button appearance="primary">Create Use Case</Button>
      </div>
    </div>
  );
}

export default NewUseCase;
