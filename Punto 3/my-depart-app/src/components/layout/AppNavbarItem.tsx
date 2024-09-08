import "../../styles/layout/AppNavbarItem.css";
import { Link, useLocation } from "react-router-dom";
import SVGIcon from "../shared/ui/SVGIcon";

const AppNavbarItem = (props: {
  to: string;
  title: string;
  icon: string;
  onClickItem: Function;
}) => {
  const { pathname } = useLocation();

  return (
    <Link
      className={
        pathname === props.to
          ? "navbar-item active flex align-center justify-center"
          : "navbar-item flex align-center justify-center"
      }
      style={{ gap: "5px" }}
      to={props.to}
      onClick={() => props.onClickItem()}
    >
      <SVGIcon icon={props.icon} />
      <p>{props.title}</p>
    </Link>
  );
};

export default AppNavbarItem;
