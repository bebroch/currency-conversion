import React from "react";
import ReactDOM from "react-dom/client";
import Conversion from "./conversion/conversion";
import "./assets/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Conversion />
    </React.StrictMode>,
);
