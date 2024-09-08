import { SVG_ICONS } from "../../helpers/svgIcons";
import AppNavbarItem from "./AppNavbarItem";

const AppNavbar = (props: { justify: string }) => {
  return (
    <div
      className={"h-full w-full flex row align-center justify-end "}
      style={{
        justifyContent: props.justify,
        gap: "10px",
      }}
    >
      <AppNavbarItem
        to="/departments"
        title="Departamentos"
        icon={SVG_ICONS.HOME}
        onClickItem={() => {}}
      />
      <AppNavbarItem
        to="/persons"
        title="Personas"
        icon={SVG_ICONS.WORKING_OUT}
        onClickItem={() => {}}
      />
    </div>
  );
};

export default AppNavbar;
