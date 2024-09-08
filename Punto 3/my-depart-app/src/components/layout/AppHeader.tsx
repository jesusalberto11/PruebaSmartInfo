import "../../styles/layout/AppHeader.css";
import AppNavbar from "./AppNavbar";
import AppSidebar from "./AppSidebar";

const AppHeader = () => {
  return (
    <header className="app-header flex align-center justify-center">
      <div className="header-items w-full flex align-center justify-between">
        <div
          className="flex align-center justify-center"
          style={{ gap: "10px" }}
        >
          <AppSidebar />

          <p className="header-title pacifico-font">MyDepartments</p>
        </div>
        <div
          className="flex align-center justify-center"
          style={{ gap: "10px" }}
        >
          <div className="hide-on-responsive">
            <AppNavbar justify="center" />
          </div>
          <div className="circle"></div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
