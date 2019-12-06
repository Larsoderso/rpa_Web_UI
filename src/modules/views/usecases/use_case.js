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

import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';

import PageHeader from '@atlaskit/page-header';

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="Use Cases" key="Some project" />
    <BreadcrumbsItem text="Excel Data Import" key="Parent page" />
  </BreadcrumbsStateless>
);

function SingleUseCase() {
  // Send Login Credentials to Server
  let { path, url } = useRouteMatch();

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

  return (
    <div style={{ display: "flex", width: "100%" }}>
     <div style={{display: 'grid', width: '100%', gridTemplateColumns: '4fr 1fr', gap: '12px 32px'}}>
     
     <div>
<div style={{paddingLeft: "12px"}}>


       <PageHeader breadcrumbs={breadcrumbs}>
Excel Data Import  </PageHeader>
</div>

     <MyDropzone/>
     <div style={{paddingLeft: "12px"}}>

     <div>Files</div>
     
     
     </div>
     </div><div style={{background: '#f1f7f9', width: '100%', height: '100vh'}}>
     
  <div style={{background: 'rgb(241, 247, 249)', width: '100%', height: '100vh'}}><div style={{height: 'calc(100vh - 150px)'}} /><div style={{height: '150px', background: '#ecf1f3'}} /></div>
     
     
     </div></div>
    </div>
  );
}


export default SingleUseCase;
