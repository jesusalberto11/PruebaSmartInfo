import { useEffect, useState } from "react";
import { IExercisesPerDay, useTrainLog } from "../../../hooks/useTrainLog";
import "../../../styles/components/pages/StatsPage/WeekMostActiveDay.css";

const WeekMostActiveDay = () => {
  const { countExercisesPerDay } = useTrainLog();

  const [countPerDay, setCountPerDay] = useState<IExercisesPerDay[] | null>(
    null
  );
  const [maxCount, setMaxCount] = useState<number | null>(null);
  const [mostActiveDay, setMostActiveDay] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    countExercisesPerDay().then((response) => {
      if (response) {
        setCountPerDay(response);
      }
    });
  }, []);

  useEffect(() => {
    if (!countPerDay) return;

    setMaxCount(
      Math.max(...countPerDay.map((item: IExercisesPerDay) => item.count))
    );
  }, [countPerDay]);

  useEffect(() => {
    if (!countPerDay) return;

    setMostActiveDay(
      countPerDay.find((item: IExercisesPerDay) => item.count === maxCount)
        ?.fullName
    );
  }, [maxCount]);

  return (
    <div
      className="w-full box white-box rounded-corners flex align-center justify-center"
      style={{ gap: "20px" }}
    >
      <div
        className="h-full min-with-fit-content flex column centered"
        style={{ gap: "5px" }}
      >
        <p style={{ color: "#686868", fontSize: "14px" }}>Dia mas activo</p>
        <p className="font-bold" style={{ fontSize: "22px" }}>
          {mostActiveDay ? mostActiveDay : "No hay datos"}
        </p>
      </div>
      <div className="h-full flex row centered chart" style={{ gap: "10px" }}>
        {countPerDay?.map((item, index) => (
          <div
            key={index}
            className="w-full h-full flex column"
            style={{ gap: "2px" }}
          >
            <div className="bar-container" style={{ height: "100px" }}>
              <div
                className={item.count === maxCount ? "bar active" : "bar"}
                style={{
                  height: `${(item.count / (maxCount ? maxCount : 1)) * 100}%`,
                }}
                title={`${item.count} Ejercicios realizados `}
              ></div>
            </div>
            <p style={{ color: "#686868", fontSize: "14px" }}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekMostActiveDay;
