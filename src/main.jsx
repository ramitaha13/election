import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./component/home.jsx";
import Admindashboard from "./component/admindashboard.jsx";
import StationsPage from "./component/stationsPage.jsx";
import Votersbystationpage from "./component/votersbystationpage.jsx";
import Voterspage from "./component/voterspage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/stationsPage" element={<StationsPage />} />
        <Route path="/votersbystationpage" element={<Votersbystationpage />} />
        <Route path="/voterspage" element={<Voterspage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
