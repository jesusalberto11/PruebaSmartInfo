import { useNavigate } from "react-router-dom";
import { IDepartment } from "../../../interfaces/IDepartment";

const DepartmentsList = (props: { items: Array<IDepartment> }) => {
  const navigate = useNavigate();

  return (
    <ol className="flex column" style={{ gap: "10px" }}>
      {props.items.map((department: IDepartment, index) => (
        <li
          key={index}
          className="box rounded-corners blue-box flex column align-start justify-center"
          style={{ gap: "10px" }}
          onClick={() => navigate(`/add-department/${department.id}`)}
        >
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {department.name}
          </p>
          <div className="w-full list-item-footer flex align-center justify-between">
            <p style={{ color: "#403D2C", fontSize: "13px" }}>
              Cantidad de personas: {department?.people_count}
            </p>
          </div>
        </li>
      ))}
      <div className="ghost-list-item"></div>
    </ol>
  );
};

export default DepartmentsList;
