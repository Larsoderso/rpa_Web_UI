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

function getAdorableAvatar(id: string, size: number = 80) {
  return `https://api.adorable.io/avatars/${size}/${id}.png`;
}

function Kanban() {
  useEffect(() => getBoard(), []);

  const [red, setredir] = useState(<div />);
  const [board, setboard] = useState([]);

  function getBoard() {
    console.log("--- Load Board----");
    axios
      .get(
        `https://7080-fb9537d9-26b2-4e22-a59c-3c743b0f5499.ws-eu01.gitpod.io/board`
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
        .put(
          `https://7080-fb9537d9-26b2-4e22-a59c-3c743b0f5499.ws-eu01.gitpod.io/uc/1/status`,
          {
            Uc: did_final,
            Status: info.destination.droppableId
          }
        )
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    }
  }

  const renderCard = row => (
    <div
      style={{
        /* width: '320px', */ background: "#2cafea",
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
              pathname: "/ui/use-cases/" + row.id
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
        data={[
          { name: "Lars D", src: getAdorableAvatar("LarsD") },
          { name: "Konstantin R", src: getAdorableAvatar("KR") },
          { name: "Noah S", src: getAdorableAvatar("NoahS") },
          { name: "Tim T", src: getAdorableAvatar("TT") },
          { name: "Max Mustermann", src: getAdorableAvatar("M") },
          { name: "John Doe" }
        ]}
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
      padding: 10,
      borderRadius: 2,
      paddingBottom: 0,
      userSelect: "none",
      background: "rgb(255, 255, 255)",
      borderRadius: "8px",
      borderTopRightRadius: "0px",
      borderTopLeftRadius: "0px",
      minHeight: "90vh"
    },
    columnHeaderStyle: {
      background: "rgb(255, 255, 255)",
      boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 19px",
      borderRadius: "8px",
      padding: "2px",
      marginTop: "22px",
      textAlign: "center",
      borderTop: "10px solid rgb(96, 125, 139)",
      marginBottom: "8px"
    },
    columnTitleStyle: {
      fontWeight: 600,
      fontSize: 14,
      color: "#607389",
      marginRight: 5
    }
  };

  return (
    <div>
      {red}

      <div
        style={{
          width: "100%",
          height: "20px",
          flexShrink: 0,
          padding: "12px",
          overflow: "hidden"
        }}
      >
        <UsecaseViewSwitcher />
      </div>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "7fr 2fr",
          marginTop: "15px",
          paddingBottom: "8px",
          height: "100%"
        }}
      >
        <div>
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
                background: "rgb(250, 70, 21)",
                borderRadius: "4px"
              }}
            />
            <div style={{ lineHeight: "30px", paddingLeft: "12px" }}>
              {" "}
              Abteilung A{" "}
            </div>
          </div>
          <div
            style={{
              paddingLeft: "12px",
              display: "flex",
              paddingTop: "4px"
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                boxShadow: "rgba(157, 172, 202, 0.37) 0px 1px 4px",
                background: "rgb(44, 175, 234)",
                borderRadius: "4px"
              }}
            />
            <div style={{ lineHeight: "30px", paddingLeft: "12px" }}>
              {" "}
              Abteilung B{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kanban;
