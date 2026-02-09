import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import Navbar from "./components/navbar.jsx";

const Main = () => {
  const [isLight, setIsLight] = useState(false);
  return (
    <StrictMode>
      <div className={isLight ? "" : "dark"}>
        <Navbar isLight={isLight} setIsLight={setIsLight} />
        <App />
      </div>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
