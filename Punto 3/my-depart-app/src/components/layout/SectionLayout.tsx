import { ReactNode } from "react";
import { Link } from "react-router-dom";

const SectionLayout = (props: {
  title: string;
  link?: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-full flex column" style={{ gap: "10px" }}>
      <div className="w-full flex" style={{ gap: "5px" }}>
        <p>{props.title ? props.title : "Default title"}</p>
        {props.link && (
          <span className="text-link">
            <Link to={`/${props.link}`}>ver más</Link>
          </span>
        )}
      </div>

      {props.children}
    </div>
  );
};

export default SectionLayout;
