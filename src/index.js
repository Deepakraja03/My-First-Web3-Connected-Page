import React from "react";
import {createRoot} from "react-dom/client";

import App from "./App";

const express = require('express');
const product = require("./App.js");
const app = express();

const PORT = process.env.PORT || 3000;

app.use("/App", product);
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

createRoot(document.getElementById("root")).render(<App />);