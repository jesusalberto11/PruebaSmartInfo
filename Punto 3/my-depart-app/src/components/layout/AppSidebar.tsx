import "../../styles/layout/AppSidebar.css";
import { useState } from "react";
import { SVG_ICONS } from "../../helpers/svgIcons";
import SimpleButton from "../shared/buttons/SimpleButton";
import AppNavbarItem from "./AppNavbarItem";

const AppSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="show-on-responsive">
        <SimpleButton
          showTitle={false}
          title="Open menu"
          icon={SVG_ICONS.THREE_LINES}
          onClickItem={() => setSidebarOpen(true)}
        />
      </div>
      <aside className={isSidebarOpen ? "sidebar sidebar-active " : "sidebar"}>
        <div
          className={
            isSidebarOpen ? "close-zone active-close-zone" : "close-zone"
          }
          role="presentation"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="sidebar-header">
          <p className="sidebar-header-title centered">MyExercises</p>
          <SimpleButton
            showTitle={false}
            title="Open menu"
            icon={SVG_ICONS.CLOSE}
            onClickItem={() => setSidebarOpen(false)}
          />
        </div>
        <div className="sidebar-items-container">
          <hr role="presentation" />
          <div
            className={"h-full w-full flex column align-start justify-start"}
            style={{ gap: "10px" }}
          >
            <AppNavbarItem
              to="/departments"
              title="Departamentos"
              icon={SVG_ICONS.HOME}
              onClickItem={() => setSidebarOpen(false)}
            />
            <AppNavbarItem
              to="/persons"
              title="Personas"
              icon={SVG_ICONS.WORKING_OUT}
              onClickItem={() => setSidebarOpen(false)}
            />
          </div>

          <hr role="presentation" />
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
