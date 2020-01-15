import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  type ComponentType,
  type Node
} from "react";
import Avatar from "@atlaskit/avatar";
import AvatarGroup from "@atlaskit/avatar-group";
import ReactKanban from "react-kanban-dnd";
import UsecaseViewSwitcher from "../../components/view_switcher_uc";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import axios from "axios";
import Tabs from "@atlaskit/tabs";

function getAdorableAvatar(id: string, size: number = 80) {
  return `https://api.adorable.io/avatars/${size}/${id}.png`;
}

function Kanban() {
  useEffect(() => getBoard(), []);

  const [red, setredir] = useState(<div />);
  const [board, setboard] = useState([]);
  const [teamListing, setTeamListing] = useState([]);
  const [comments, setComments] = useState([
    { Author: "user@rpa.rocks", text: "tesckoooomentar" }
  ]);
  const tabs = [
    { label: "Kanban", content: <div>One</div> },
    { label: "Matrix", content: <div>Two</div> }
  ];

  useEffect(() => getTeams(), []);

  function getTeams() {
    console.log("--- Load teams----");
    axios
      .get(
        `https://api.rpa.rocks/teams`
        // { user }
      )
      .then(res => {
        console.log(res.data);
        setTeamListing(res.data);

        console.log("teams----", teamListing);
      });
  }

  function getBoard() {
    console.log("--- Load Board----");
    axios
      .get(
        `https://api.rpa.rocks/board`
        // { user }
      )
      .then(res => {
        console.log(res);
        console.log(res.data.Board);

        for (var i = 0; i < 5; i++) {
          if (res.data.Board[i].rows == null) {
            res.data.Board[i].rows = [];
          }
        }
        setboard(res.data.Board);

        console.log(board);
      });
  }

  const columns = [
    {
      id: 1,
      title: "Idea",
      rows: [
        {
          id: "row1",
          Name: "Kundenprojekt Test",
          Description: "",
          Status: 1,
          Team: null
        }
      ]
    },
    {
      id: 2,
      title: "Concept",
      rows: []
    },
    {
      id: 3,
      title: "Development",
      rows: []
    },
    {
      id: 4,
      title: "Testing",
      rows: []
    },
    {
      id: 5,
      title: "Operation",
      rows: []
    }
  ];

  function cardChange(info) {
    console.log("cardchange", info);

    if (info.type == "ROW") {
      console.log("cardchange", info);
      console.log("dest", info.destination.droppableId);

      var did = info.draggableId;
      did = did.replace("uc_", "");
      var did_final = parseInt(did);
      console.log("did", did_final);

      axios
        .put(`https://api.rpa.rocks/uc/1/status`, {
          Uc: did_final,
          Status: info.destination.droppableId
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    }
  }

  function getrealID(did) {
    did = did.replace("uc_", "");
    return parseInt(did);
  }
  const renderCard = row => (
    <div
      style={{
        /* width: '320px', */ background: row.Color,
        boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 19px",
        borderRadius: "8px",
        padding: "12px",
        textAlign: "center",
        height: "120px",
        color: "white",
        textAlign: "left",
        transition: "1s linear"
      }}
      onClick={() =>
        setredir(
          <Redirect
            to={{
              pathname: "/ui/use-cases/" + getrealID(row.id)
            }}
          />
        )
      }
    >
      <div style={{ fontWeight: 600, fontSize: "18px" }}>{row.Name}</div>
      <br />
      Team
      <AvatarGroup
        appearance="stack"
        onAvatarClick={console.log}
        height={10}
        data={row.Team.map(function(i, el) {
          return { name: "Lars D", src: getAdorableAvatar("LarsD") };
        })}
        size="small"
      />
    </div>
  );
  const styles = {
    cardWrapper: {
      borderRadius: 2,
      border: "1px solid rgba(96,115,137,0.12)",
      backgroundColor: "#ffffff",
      boxShadow: "none",
      padding: "9px 9px 0px 9px",
      minHeight: 40,
      marginBottom: 8
    },
    columnStyle: {
      border: "none",
      borderRadius: 2,
      paddingBottom: 0,
      userSelect: "none",
      background: "rgb(255, 255, 255)",
      borderRadius: "8px",
      borderTopRightRadius: "0px",
      borderTopLeftRadius: "0px",
      minHeight: "90vh",
      maxWidth: "240px"
    },
    columnHeaderStyle: {
      background: "rgb(255, 255, 255)",
      boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 19px",
      borderRadius: "8px",
      padding: "2px",
      textAlign: "center",
      borderTop: "10px solid rgb(96, 125, 139)",
      marginBottom: "8px",
      maxWidth: "240px"
    },
    columnTitleStyle: {
      fontWeight: 600,
      fontSize: 14,
      color: "#607389",
      marginRight: 5
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      {red}
      <Tabs
        tabs={tabs}
        onSelect={(_tab, index) => console.log("Selected Tab", index + 1)}
      />

      <div
        style={{
          width: "100%",
          height: "90px",
          background: "#587887",
          flexShrink: 0,
          padding: "12px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            color: "white",
            lineHeight: "80px",
            fontWeight: 400,
            fontSize: "34px"
          }}
        >
          {" "}
          Use cases{" "}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
          marginTop: "15px",
          paddingBottom: "8px",
          height: "100%"
        }}
      >
        <div style={{ height: "100vh" }}>
          {board.length != 0 && (
            <ReactKanban
              style={{
                height: "80vh",
                minWidth: "50vw",
                width: "55vw",
                maxWidth: "60vw"
              }}
              columns={board}
              renderCard={renderCard}
              columnStyle={styles.columnStyle}
              columnHeaderStyle={styles.columnHeaderStyle}
              onDragEnd={info => {
                cardChange(info);
              }}
            />
          )}
        </div>
        <div
          style={{
            width: "100%",
            background: "rgba(247, 247, 247, 0.12)",
            height: "100vh",
            marginLeft: "14px"
          }}
        >
          <div
            style={{
              paddingLeft: "12px",
              paddingTop: "12px",
              paddingBottom: "12px",
              fontWeight: 500,
              fontSize: "16px"
            }}
          >
            Legende
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr "
            }}
          >
            {teamListing.map(function(object, i) {
              return (
                <div
                  style={{
                    paddingLeft: "12px",
                    display: "flex",
                    paddingBottom: "4px",
                    paddingTop: "4px"
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      boxShadow: "rgba(157, 172, 202, 0.37) 0px 1px 4px",
                      background: object.Color,
                      borderRadius: "4px"
                    }}
                  />
                  <div style={{ lineHeight: "30px", paddingLeft: "12px" }}>
                    {object.Name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kanban;
