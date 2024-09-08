import { useEffect, useState } from "react";
import { useExercises } from "../../../hooks/useExercises";
import SearchInput from "../../shared/data-entry/SearchInput";
import { IExercise } from "../../../interfaces/IExercise";
import LoaderSpinner from "../../shared/ui/LoaderSpinner";
import SimpleButton from "../../shared/buttons/SimpleButton";
import { SVG_ICONS } from "../../../helpers/svgIcons";
import { ITrainLog } from "../../../interfaces/ITrainLog";
import { useTrainLog } from "../../../hooks/useTrainLog";

const TrainExerciseModal = () => {
  const { getExercises } = useExercises();
  const { createTrainLog } = useTrainLog();

  const [exercises, setExercises] = useState<IExercise[] | null>(null);
  const [filteredExercises, setFilteredExercises] = useState<IExercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
    null
  );
  const [setsCount, setSetsCount] = useState<number>(4);
  const [setsData, setSetsData] = useState(
    Array(setsCount).fill({ weight: "", reps: "" })
  );
  const [exerciseDate, setExerciseDate] = useState<string>("");

  useEffect(() => {
    getExercises().then((response) => {
      if (response) {
        setExercises(response);
        setFilteredExercises(response);
      }
    });
  }, []);

  useEffect(() => {
    setSetsData(Array(setsCount).fill({ weight: "", reps: "" }));
  }, [setsCount]);

  useEffect(() => {
    if (!exerciseDate) return;
    console.log(new Date(exerciseDate));
  }, [exerciseDate]);

  const handleSetCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value);

    if (count >= 1 && count <= 10) {
      setSetsCount(count);
    }
  };

  const handleInputChange = (
    index: number,
    field: "weight" | "reps",
    value: string
  ) => {
    const updatedSets = setsData.map((set, i) =>
      i === index ? { ...set, [field]: value } : set
    );
    setSetsData(updatedSets);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    let eDate = null;

    if (exerciseDate !== "") {
      const [year, month, day] = exerciseDate.split("-").map(Number);

      eDate = new Date(year, month - 1, day);
    }

    console.log(eDate);

    const newTrainLog: ITrainLog = {
      id: crypto.randomUUID(),
      exercise_id: selectedExercise?.id,
      sets: setsData,
      date: new Date(),
    };

    // await createTrainLog(newTrainLog).then(() => {
    //   setSelectedExercise(null);
    //   setSetsCount(4);
    //   setSetsData(Array(setsCount).fill({ weight: "", reps: "" }));
    //   setExerciseDate("")
    // });
  };

  return (
    <div
      className="add-exercise-modal w-full flex column"
      style={{ gap: "10px" }}
    >
      {!selectedExercise ? (
        <>
          <p>Seleccionar ejercicio</p>
          <SearchInput
            placeholder="Buscar ejercicio"
            list={exercises}
            setList={setFilteredExercises}
          />
          <div
            className="new-set-exercises-list h-full w-full flex column"
            style={{ gap: "5px", maxHeight: "300px" }}
          >
            <>
              {filteredExercises ? (
                filteredExercises.length === 0 ? (
                  <p>No hay ejercicios</p>
                ) : (
                  filteredExercises.map((exercise: IExercise) => (
                    <div
                      className="list-item flex align-center justify-start"
                      style={{ marginRight: "5px" }}
                      key={exercise.id}
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      {exercise.name}
                    </div>
                  ))
                )
              ) : (
                <div className="w-full h-full flex centered">
                  <LoaderSpinner />
                </div>
              )}
            </>
          </div>
        </>
      ) : (
        <form
          onSubmit={onSubmit}
          className="w-full flex column"
          style={{ gap: "10px" }}
        >
          <div
            className="w-full flex align-center justify-start"
            style={{ gap: "5px" }}
          >
            <SimpleButton
              showTitle={false}
              title="Regresar"
              icon={SVG_ICONS.ARROW_LEFT}
              onClickItem={() => setSelectedExercise(null)}
            />
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              {selectedExercise ? selectedExercise.name : "Selecciona"}
            </p>
          </div>
          <div
            className="w-full column flex align-start"
            style={{ gap: "5px" }}
          >
            <div
              className=" flex row align-center justify-start"
              style={{ gap: "10px" }}
            >
              <label htmlFor="date" style={{ fontSize: "16px" }}>
                Fecha
              </label>
              <input
                id="date"
                type="date"
                onChange={(e) => setExerciseDate(e.target.value)}
              />
            </div>
            <p style={{ color: "#686868", fontSize: "14px" }}>
              Se usará la fecha actual si no seleccionas una.
            </p>
          </div>
          <div className="w-full flex align-start" style={{ gap: "10px" }}>
            <div
              className=" flex column align-start justify-start"
              style={{ gap: "3px" }}
            >
              <label htmlFor="sets" style={{ fontSize: "16px" }}>
                Series realizadas:
              </label>
              <p style={{ color: "#686868", fontSize: "14px" }}>
                Mínimo 1 - Máximo 10.
              </p>
            </div>
            <input
              id="sets"
              placeholder="Cantidad de series"
              type="number"
              min={1}
              max={10}
              value={setsCount}
              onChange={(e) => handleSetCountChange(e)}
            />
          </div>
          <div
            className="w-full flex column align-center justify-start"
            style={{ maxHeight: "250px", overflowY: "scroll" }}
          >
            {setsData.map((set, index) => (
              <div
                key={index}
                className="h-full flex align-center justify-center"
                style={{ gap: "5px", paddingBottom: "10px" }}
              >
                <p style={{ color: "#686868", fontSize: "14px" }}>
                  Serie {index + 1} -{" "}
                </p>
                <input
                  style={{ maxWidth: "100px" }}
                  placeholder={`Peso (${selectedExercise.weight_measure})`}
                  value={set.weight}
                  onChange={(e) =>
                    handleInputChange(index, "weight", e.target.value)
                  }
                  required
                />
                <p>-</p>
                <input
                  style={{ maxWidth: "120px" }}
                  placeholder="Repeticiones"
                  value={set.reps}
                  onChange={(e) =>
                    handleInputChange(index, "reps", e.target.value)
                  }
                  required
                />
              </div>
            ))}
          </div>

          <button type="submit" className="confirm-button">
            Crear entrada
          </button>
        </form>
      )}
    </div>
  );
};

export default TrainExerciseModal;
