import "../../styles/layout/PageLayout.css";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import SimpleButton from "../shared/buttons/SimpleButton";
import { SVG_ICONS } from "../../helpers/svgIcons";

const PageLayout = (props: {
  children: ReactNode;
  gap: number;
  padding: number;
  firstTitle?: string;
  secondTitle?: string;
  showBackButton?: boolean;
  backTo?: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex column align-center justify-center">
      <div
        className="page-content h-full w-full flex column"
        style={{ gap: `${props.gap}px`, padding: `${props.padding}px` }}
      >
        <div className="w-full flex" style={{ gap: "10px" }}>
          {props.showBackButton && (
            <SimpleButton
              icon={SVG_ICONS.GO_BACK}
              showTitle={false}
              title="Regresar"
              onClickItem={() => navigate(-1)}
            />
          )}
          <p className="page-title font-bold">
            {props.firstTitle ? props.firstTitle : ""}{" "}
            <span className="page-title-second-text">
              {props.secondTitle ? props.secondTitle : "Title"}
            </span>
          </p>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default PageLayout;
