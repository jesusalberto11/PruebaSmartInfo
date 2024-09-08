import "./styles/App.css";
import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/AppHeader";

function App() {
  return (
    <div className="app-container">
      <AppHeader />
      <div className="main-content h-full w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
