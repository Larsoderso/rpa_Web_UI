// @flow

import React, {
  Component,
  Fragment,
  useState,
  type ComponentType,
  type Node
} from "react";
import Avatar from "@atlaskit/avatar";
import Drawer from "@atlaskit/drawer";
import {
  DropdownItem,
  DropdownItemGroup,
  DropdownMenuStateless
} from "@atlaskit/dropdown-menu";
import { AkCodeBlock } from "@atlaskit/code";

import { colors } from "@atlaskit/theme";

import {
  GlobalItem,
  GlobalNavigationSkeleton,
  GlobalNav,
  ThemeProvider,
  modeGenerator
} from "@atlaskit/navigation-next";

import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { ButtonGroup } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import Page from "@atlaskit/page";
import AvatarGroup from "@atlaskit/avatar-group";
import { AtlassianIcon } from "@atlaskit/logo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";

function getAdorableAvatar(id: string, size: number = 80) {
  return `https://api.adorable.io/avatars/${size}/${id}.png`;
}
import PageHeader from "@atlaskit/page-header";

function GaugeIcon() {
  return (
    <svg
      width={28}
      height={25}
      viewBox="0 0 30 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25119 26.3959C5.62546 26.7192 6.08806 26.923 6.57928 26.981C7.0705 27.0389 7.56781 26.9483 8.00703 26.7208C10.1622 25.5838 12.563 24.9917 14.9997 24.9961C17.5244 24.9961 19.9053 25.621 21.9924 26.7208C22.8861 27.1957 23.9859 27.0458 24.7545 26.3896C26.5398 24.8646 27.9412 22.9409 28.8455 20.7741C29.7497 18.6073 30.1315 16.2581 29.96 13.9165C29.6858 10.3058 28.1199 6.91482 25.5491 4.3647C22.9784 1.81458 19.5748 0.276076 15.9621 0.0310435C12.8196 -0.171432 9.69307 0.620379 7.02576 2.29423C4.35844 3.96808 2.28567 6.43905 1.10126 9.35684C-0.08314 12.2746 -0.319077 15.4912 0.4269 18.5506C1.17288 21.61 2.86292 24.357 5.25744 26.4021L5.25119 26.3959ZM6.80096 23.5213L6.54475 23.2651C5.31844 22.0107 4.38149 20.5031 3.79962 18.8482C3.21775 17.1933 3.00507 15.4311 3.1765 13.6853C3.25149 13.1728 3.28898 12.6229 3.42646 12.123L3.61394 11.3544L3.88265 10.6045C3.95763 10.342 4.07012 10.092 4.1826 9.85458C4.30133 9.60461 4.40757 9.35465 4.53255 9.11719C4.80751 8.64851 5.05747 8.16108 5.39492 7.72989C6.63906 5.95852 8.33216 4.55012 10.3004 3.64925C10.7754 3.43054 11.2565 3.25556 11.7252 3.09309C12.2064 2.97435 12.6688 2.79938 13.1438 2.73689C13.6124 2.6619 14.0686 2.56816 14.5186 2.54942C14.956 2.52442 15.4122 2.48693 15.8059 2.50567C17.6791 2.54656 19.5195 3.0056 21.1926 3.84922C21.3189 3.91077 21.432 3.99661 21.5252 4.10184C21.6184 4.20706 21.6899 4.32961 21.7358 4.4625C21.7816 4.59538 21.8008 4.73599 21.7923 4.87631C21.7838 5.01662 21.7478 5.15388 21.6862 5.28026C21.6247 5.40664 21.5389 5.51966 21.4336 5.61286C21.3284 5.70607 21.2058 5.77763 21.073 5.82348C20.9401 5.86932 20.7995 5.88854 20.6592 5.88004C20.5188 5.87154 20.3816 5.83548 20.2552 5.77394L20.2302 5.75519L20.1927 5.73644L19.899 5.58022C19.1775 5.21835 18.4191 4.9355 17.6368 4.73659C17.0175 4.58644 16.3859 4.49232 15.7496 4.45538C15.3747 4.42414 15.0247 4.44289 14.6373 4.45538C14.2623 4.45538 13.8687 4.51787 13.4687 4.56787C13.0625 4.60536 12.6626 4.74284 12.2439 4.82408C10.9419 5.19813 9.71974 5.80816 8.63819 6.62381C7.90704 7.21122 7.2009 7.86737 6.63848 8.64226C6.31978 9.0047 6.09482 9.42964 5.82611 9.82958C5.70737 10.0358 5.60739 10.2545 5.50115 10.467C5.38867 10.6732 5.28244 10.8919 5.20745 11.1106L4.95124 11.773L4.76376 12.4479C4.61379 12.8979 4.57629 13.3353 4.48881 13.7727C4.25527 15.436 4.41363 17.1308 4.95124 18.722C5.43476 20.1613 6.2114 21.4848 7.23215 22.6089L7.48211 22.8839C7.56441 22.9747 7.60783 23.0942 7.60307 23.2167C7.59832 23.3392 7.54575 23.455 7.45665 23.5392C7.36754 23.6234 7.249 23.6693 7.12643 23.6671C7.00386 23.665 6.88702 23.6148 6.80096 23.5275V23.5213Z"
        fill="#FFC6EF"
        style={{ fill: "white" }}
      />
      <path
        d="M24.2795 24.2772C24.1625 24.3936 24.0041 24.459 23.839 24.459C23.6739 24.459 23.5155 24.3936 23.3984 24.2772L22.0674 22.9524C21.9497 22.8348 21.8836 22.6752 21.8836 22.5087C21.8836 22.3423 21.9497 22.1827 22.0674 22.0651C22.1851 21.9474 22.3446 21.8813 22.5111 21.8813C22.6775 21.8813 22.8371 21.9474 22.9547 22.0651L24.2795 23.3961C24.394 23.5129 24.4582 23.67 24.4582 23.8335C24.4582 23.9971 24.394 24.1542 24.2795 24.271V24.2772ZM26.3667 21.5589C26.3259 21.6305 26.2713 21.6933 26.2061 21.7437C26.1409 21.7942 26.0664 21.8312 25.9868 21.8527C25.9072 21.8742 25.8242 21.8797 25.7425 21.869C25.6607 21.8582 25.5819 21.8314 25.5106 21.7901L23.8859 20.8527C23.7417 20.7699 23.6363 20.6331 23.5929 20.4726C23.5496 20.312 23.5718 20.1408 23.6546 19.9966C23.7375 19.8524 23.8743 19.7471 24.0348 19.7037C24.1954 19.6603 24.3666 19.6825 24.5108 19.7654L26.1355 20.7028C26.2071 20.7436 26.27 20.7982 26.3204 20.8634C26.3708 20.9286 26.4078 21.0031 26.4293 21.0827C26.4508 21.1623 26.4563 21.2453 26.4456 21.327C26.4349 21.4088 26.4081 21.4876 26.3667 21.5589V21.5589ZM27.679 18.3969C27.6573 18.4761 27.6202 18.5503 27.5699 18.6151C27.5195 18.68 27.4568 18.7343 27.3854 18.7749C27.314 18.8156 27.2353 18.8417 27.1538 18.8519C27.0723 18.8621 26.9896 18.8561 26.9104 18.8343L25.0982 18.3531C25.0186 18.3318 24.944 18.295 24.8786 18.2448C24.8132 18.1946 24.7583 18.1321 24.7171 18.0607C24.6759 17.9893 24.6492 17.9105 24.6385 17.8288C24.6277 17.7471 24.6332 17.6641 24.6545 17.5845C24.6758 17.5049 24.7126 17.4303 24.7628 17.3649C24.813 17.2995 24.8755 17.2446 24.9469 17.2034C25.0911 17.1202 25.2624 17.0977 25.4231 17.1408L27.2354 17.6282C27.3146 17.6499 27.3888 17.687 27.4536 17.7374C27.5185 17.7878 27.5728 17.8505 27.6134 17.9219C27.6541 17.9932 27.6802 18.0719 27.6904 18.1534C27.7006 18.235 27.6946 18.3177 27.6728 18.3969H27.679ZM28.1227 14.9974C28.1227 15.1631 28.0569 15.3221 27.9397 15.4392C27.8225 15.5564 27.6636 15.6223 27.4978 15.6223H25.6231C25.4574 15.6223 25.2984 15.5564 25.1812 15.4392C25.064 15.3221 24.9982 15.1631 24.9982 14.9974C24.9982 14.8316 25.064 14.6727 25.1812 14.5555C25.2984 14.4383 25.4574 14.3725 25.6231 14.3725H27.4978C27.6636 14.3725 27.8225 14.4383 27.9397 14.5555C28.0569 14.6727 28.1227 14.8316 28.1227 14.9974ZM27.6728 11.5979C27.6946 11.6771 27.7006 11.7598 27.6904 11.8413C27.6802 11.9228 27.6541 12.0015 27.6134 12.0729C27.5728 12.1443 27.5185 12.2069 27.4536 12.2573C27.3888 12.3077 27.3146 12.3448 27.2354 12.3665L25.4231 12.8539C25.3435 12.8753 25.2605 12.8807 25.1788 12.87C25.0971 12.8592 25.0183 12.8325 24.9469 12.7913C24.8028 12.7081 24.6976 12.571 24.6545 12.4103C24.6114 12.2495 24.6339 12.0782 24.7171 11.934C24.8004 11.7899 24.9374 11.6847 25.0982 11.6416L26.9104 11.1604C27.0695 11.1183 27.2388 11.1406 27.3815 11.2225C27.5242 11.3044 27.6289 11.4393 27.6728 11.5979V11.5979ZM26.3605 8.43585C26.4021 8.5068 26.4292 8.58525 26.4404 8.66672C26.4516 8.74819 26.4466 8.83107 26.4257 8.91061C26.4048 8.99014 26.3684 9.06477 26.3186 9.13021C26.2688 9.19565 26.2066 9.25062 26.1355 9.29197L24.5108 10.2293C24.3666 10.3122 24.1954 10.3344 24.0348 10.291C23.8743 10.2477 23.7375 10.1423 23.6546 9.99811C23.5718 9.85392 23.5496 9.68272 23.5929 9.52217C23.6363 9.36161 23.7417 9.22486 23.8859 9.14199L25.5106 8.20463C25.5819 8.16331 25.6607 8.13651 25.7425 8.12577C25.8242 8.11504 25.9072 8.12057 25.9868 8.14206C26.0664 8.16355 26.1409 8.20058 26.2061 8.251C26.2713 8.30142 26.3259 8.36424 26.3667 8.43585H26.3605ZM13.9623 13.96L23.8109 5.24882C23.9352 5.12452 24.1038 5.05469 24.2795 5.05469C24.4553 5.05469 24.6239 5.12452 24.7482 5.24882C24.8725 5.37312 24.9424 5.54171 24.9424 5.7175C24.9424 5.89329 24.8725 6.06188 24.7482 6.18618L16.037 16.0347C15.7579 16.2896 15.3913 16.4271 15.0134 16.4186C14.6356 16.41 14.2755 16.2561 14.0082 15.9888C13.741 15.7215 13.5871 15.3615 13.5785 14.9836C13.57 14.6057 13.7074 14.2391 13.9623 13.96V13.96Z"
        fill="#D87FDB"
        style={{ fill: "#152e6d" }}
      />
    </svg>
  );
}
function ProdIcon() {
  return (
    <svg
      width={158}
      height={173}
      viewBox="0 0 158 173"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "34px", height: "34px" }}
    >
      <path
        d="M6.5 86C6.5 86 39.1497 72.0838 50 54C60.6702 36.2163 58 1.5 58 1.5"
        stroke="white"
        strokeWidth={29}
      />
      <path
        d="M151.797 86.5C151.797 86.5 119.147 72.5838 108.297 54.5C97.6269 36.7163 100.297 2 100.297 2"
        stroke="white"
        strokeWidth={29}
      />
      <path
        d="M32.0001 124.857C32.0001 124.857 60.3766 103.54 81.4629 103.185C102.199 102.836 130.929 122.507 130.929 122.507"
        stroke="white"
        strokeWidth={29}
      />
    </svg>
  );
}

function BuildingBlockIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y={10} width={10} height={10} fill="white" />
      <rect x={10} y={10} width={10} height={10} fill="white" />
      <rect width={10} height={10} fill="white" />
    </svg>
  );
}

function Example() {
  const exampleCodeBlock = `// 20191106151233
  // https://jsonplaceholder.typicode.com/users
  
  [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "username": "Karianne",
      "email": "Julianne.OConner@kory.org",
      "address": {
        "street": "Hoeger Mall",
        "suite": "Apt. 692",
        "city": "South Elvis",
        "zipcode": "53919-4257",
        "geo": {
          "lat": "29.4572",
          "lng": "-164.2990"
        }
      },
      "phone": "493-170-9623 x156",
      "website": "kale.biz",
      "company": {
        "name": "Robel-Corkery",
        "catchPhrase": "Multi-tiered zero tolerance productivity",
        "bs": "transition cutting-edge web services"
      }
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "username": "Kamren",
      "email": "Lucio_Hettinger@annie.ca",
      "address": {
        "street": "Skiles Walks",
        "suite": "Suite 351",
        "city": "Roscoeview",
        "zipcode": "33263",
        "geo": {
          "lat": "-31.8129",
          "lng": "62.5342"
        }
      },
      "phone": "(254)954-1289",
      "website": "demarco.info",
      "company": {
        "name": "Keebler LLC",
        "catchPhrase": "User-centric fault-tolerant solution",
        "bs": "revolutionize end-to-end systems"
      }
    },
    {
      "id": 6,
      "name": "Mrs. Dennis Schulist",
      "username": "Leopoldo_Corkery",
      "email": "Karley_Dach@jasper.info",
      "address": {
        "street": "Norberto Crossing",
        "suite": "Apt. 950",
        "city": "South Christy",
        "zipcode": "23505-1337",
        "geo": {
          "lat": "-71.4197",
          "lng": "71.7478"
        }
      },
      "phone": "1-477-935-8478 x6430",
      "website": "ola.org",
      "company": {
        "name": "Considine-Lockman",
        "catchPhrase": "Synchronised bottom-line interface",
        "bs": "e-enable innovative applications"
      }
    },
    {
      "id": 7,
      "name": "Kurtis Weissnat",
      "username": "Elwyn.Skiles",
      "email": "Telly.Hoeger@billy.biz",
      "address": {
        "street": "Rex Trail",
        "suite": "Suite 280",
        "city": "Howemouth",
        "zipcode": "58804-1099",
        "geo": {
          "lat": "24.8918",
          "lng": "21.8984"
        }
      },
      "phone": "210.067.6132",
      "website": "elvis.io",
      "company": {
        "name": "Johns Group",
        "catchPhrase": "Configurable multimedia task-force",
        "bs": "generate enterprise e-tailers"
      }
    },
    {
      "id": 8,
      "name": "Nicholas Runolfsdottir V",
      "username": "Maxime_Nienow",
      "email": "Sherwood@rosamond.me",
      "address": {
        "street": "Ellsworth Summit",
        "suite": "Suite 729",
        "city": "Aliyaview",
        "zipcode": "45169",
        "geo": {
          "lat": "-14.3990",
          "lng": "-120.7677"
        }
      },
      "phone": "586.493.6943 x140",
      "website": "jacynthe.com",
      "company": {
        "name": "Abernathy Group",
        "catchPhrase": "Implemented secondary concept",
        "bs": "e-enable extensible e-tailers"
      }
    },
    {
      "id": 9,
      "name": "Glenna Reichert",
      "username": "Delphine",
      "email": "Chaim_McDermott@dana.io",
      "address": {
        "street": "Dayna Park",
        "suite": "Suite 449",
        "city": "Bartholomebury",
        "zipcode": "76495-3109",
        "geo": {
          "lat": "24.6463",
          "lng": "-168.8889"
        }
      },
      "phone": "(775)976-6794 x41206",
      "website": "conrad.com",
      "company": {
        "name": "Yost and Sons",
        "catchPhrase": "Switchable contextually-based project",
        "bs": "aggregate real-time technologies"
      }
    },
    {
      "id": 10,
      "name": "Clementina DuBuque",
      "username": "Moriah.Stanton",
      "email": "Rey.Padberg@karina.biz",
      "address": {
        "street": "Kattie Turnpike",
        "suite": "Suite 198",
        "city": "Lebsackbury",
        "zipcode": "31428-2261",
        "geo": {
          "lat": "-38.2386",
          "lng": "57.2232"
        }
      },
      "phone": "024-648-3804",
      "website": "ambrose.net",
      "company": {
        "name": "Hoeger LLC",
        "catchPhrase": "Centralized empowering task-force",
        "bs": "target end-to-end models"
      }
    }
  ]
`;

  const breadcrumbs = (
    <div style={{ paddingLeft: "12px" }}>
      <BreadcrumbsStateless onExpand={() => {}}>
        <BreadcrumbsItem text="Codeanalyse" key="Some project" />
        <BreadcrumbsItem text="Example" key="Parent page" />
      </BreadcrumbsStateless>
    </div>
  );
  const actionsContent = (
    <ButtonGroup>
      <Button appearance="primary">Primary Action</Button>
      <Button>Default</Button>
      <Button>...</Button>
    </ButtonGroup>
  );
  const barContent = (
    <div style={{ display: "flex", paddingLeft: "12px" }}>
      <div style={{ flex: "0 0 200px" }}>
        <TextField isCompact placeholder="Filter" aria-label="Filter" />
      </div>
      <div style={{ flex: "0 0 200px", marginLeft: "auto" }}>
        <AvatarGroup
          appearance="stack"
          onAvatarClick={console.log}
          data={[
            { name: "Lars D", src: getAdorableAvatar("LarsD") },
            { name: "Konstantin R", src: getAdorableAvatar("KR") },
            { name: "noah s", src: getAdorableAvatar("NoahS") },
            { name: "Tim T", src: getAdorableAvatar("TT") },
            { name: "Max Mustermann", src: getAdorableAvatar("M") },
            { name: "John Doe" }
          ]}
          size="large"
        />
      </div>
    </div>
  );

  return (
    <diV
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        overflowY: "scroll"
      }}
    >
      <PageHeader
        breadcrumbs={breadcrumbs}
        actions={actionsContent}
        bottomBar={barContent}
        style={{ paddingLeft: "12px" }}
      >
        <div style={{ paddingLeft: "12px" }}> Testseite Codeanalyse</div>
      </PageHeader>
      <AkCodeBlock
        language="json"
        text={exampleCodeBlock}
        highlight="2,5-7,12-15, 50-80"
      />
    </diV>
  );
}

function UI() {
  const customMode = modeGenerator({
    product: {
      text: colors.N0,
      background: "#152E6E"
    }
  });
  let { path, url } = useRouteMatch();
  const [red, setredir] = useState(<div />);

  return (
    <ThemeProvider
      theme={theme => ({ ...theme, mode: customMode, context: "product" })}
    >
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <GlobalNav
          primaryItems={[
            {
              icon: () => <ProdIcon />,
              id: "logo",
              onClick: () =>
                setredir(
                  <Redirect
                    to={{
                      pathname: "/ui/"
                    }}
                  />
                )
            },
            {
              icon: () => <BuildingBlockIcon />,
              id: "logo",
              tooltip: "Module",
              onClick: () => console.log("Logo item clicked")
            },
            {
              icon: () => <GaugeIcon />,
              id: "logo",
              tooltip: "Performance",
              onClick: () =>
                setredir(
                  <Redirect
                    to={{
                      pathname: "/ui/code"
                    }}
                  />
                )
            }
          ]}
          secondaryItems={[]}
        />
        <diV
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
            overflowY: "scroll"
          }}
        >
          {red}
          <Switch>
            <Route exact path={`${path}/`}>
              <div>Home</div>{" "}
            </Route>
            <Route path={`${path}/users`}>
              <div>Users</div>
            </Route>
            <Route path={`${path}/code`}>
              <Example />{" "}
            </Route>
          </Switch>
        </diV>
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <div>Home</div>{" "}
          </Route>
          <Route path="/users">
            <div>Users</div>
          </Route>
          <Route path="/ui">
            <UI />{" "}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
