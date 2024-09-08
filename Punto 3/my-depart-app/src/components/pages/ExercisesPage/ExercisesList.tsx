import { useNavigate } from "react-router-dom";
import { IExercise } from "../../../interfaces/IExercise";

const ExercisesList = (props: { exercises: Array<IExercise> }) => {
  const navigate = useNavigate();

  return (
    <ol className="flex column" style={{ gap: "10px" }}>
      {props.exercises.map((exercise: IExercise) => (
        <li
          key={exercise.id}
          className="box rounded-corners blue-box flex column align-start justify-center"
          style={{ gap: "10px" }}
          onClick={() => navigate(`/exercises/${exercise.id}`)}
        >
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {exercise.name}
          </p>
          <div className="w-full list-item-footer flex align-center justify-between">
            <p style={{ color: "#403D2C", fontSize: "13px" }}>
              Peso actual: {exercise.current_weight} {exercise.weight_measure}
            </p>
            <p style={{ color: "#403D2C", fontSize: "13px" }}>
              Objetivo: {exercise.target_weight} {exercise.weight_measure}
            </p>
          </div>
        </li>
      ))}
      <div className="ghost-list-item"></div>
    </ol>
  );
};

export default ExercisesList;
