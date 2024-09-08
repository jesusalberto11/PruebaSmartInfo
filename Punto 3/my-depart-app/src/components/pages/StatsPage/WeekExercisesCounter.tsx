import { useEffect, useState } from "react";
import { useTrainLog } from "../../../hooks/useTrainLog";
import LoaderSpinner from "../../shared/ui/LoaderSpinner";

const WeekExercisesCounter = () => {
  const { countExercisesThisWeek } = useTrainLog();

  const [exercisesCount, setExercisesCount] = useState<number | null>(null);

  useEffect(() => {
    countExercisesThisWeek().then((response) => {
      if (response) {
        setExercisesCount(response);
      }
    });
  }, []);

  return (
    <div
      className="box w-full rounded-corners flex align-center justify-start"
      style={{ gap: "15px" }}
    >
      <div className="circle"></div>
      <div className="w-full h-full flex column align-start justify-center">
        {exercisesCount !== 0 ? (
          <>
            <p className="font-bold" style={{ fontSize: "22px" }}>
              {exercisesCount ? exercisesCount : "0"}
            </p>
            <p style={{ color: "#686868", fontSize: "14px" }}>
              Ejercicios realizados
            </p>
          </>
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  );
};

export default WeekExercisesCounter;
