import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import { Container, Typography } from "@mui/material";

const App: React.FC<{}> = () => {
  const [themeName, setThemeName] = useState<string>("Not Previewing a Theme");

  useEffect(() => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { from: "popup" },
          function (response) {
            if (response) {
              setThemeName(response.themeName);
            }
          }
        );
      }
    );
  }, []);

  return (
    <Container>
      <Typography sx={{ fontSize: "12px", fontStyle: "italic" }}>
        Previewing:
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{ width: `${themeName.length * 10}px` }}
      >
        {themeName}
      </Typography>
    </Container>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
