import React, { Component, Fragment, useState } from "react";

function PublicHeader() {
  return (
    <div
      style={{
        paddingTop: "24px",
        paddingLeft: "24px",
        paddingRight: "44px",
        boxSizing: "border-box",
        display: "flex"
      }}
    >
      <svg
        width={34}
        height={37}
        viewBox="0 0 34 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginTop: "12px" }}
      >
        <path
          d="M2 18.447C2 18.447 8.74129 15.5737 10.9816 11.8399C13.1847 8.16799 12.6334 1 12.6334 1"
          stroke="#1A5FE5"
          strokeOpacity="0.94"
          strokeWidth={7}
        />
        <path
          d="M32 18.5486C32 18.5486 25.2587 15.6753 23.0184 11.9414C20.8153 8.26956 21.3666 1.10156 21.3666 1.10156"
          stroke="#1A5FE5"
          strokeOpacity="0.94"
          strokeWidth={7}
        />
        <path
          d="M7.2652 26.4699C7.2652 26.4699 13.1242 22.0684 17.478 21.9951C21.7594 21.9231 27.6914 25.9846 27.6914 25.9846"
          stroke="#1A5FE5"
          strokeOpacity="0.94"
          strokeWidth={7}
        />
      </svg>
    </div>
  );
}

export default PublicHeader;
