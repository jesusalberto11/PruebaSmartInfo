import { useState } from "react";
import { IExercise } from "../../../interfaces/IExercise";

const AddExerciseModal = () => {
  const [newExerciseName, setNewExerciseName] = useState<string>("");
  const [exerciseType, setExerciseType] = useState<string>("MACHINE");
  const [unitsOfWeight, setUnitsOfWeight] = useState<string>("KG");
  const [currentWeight, setCurrentWeight] = useState<number>(0);
  const [targetWeight, setTargetWeight] = useState<number>(0);

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    const newExercise: IExercise = {
      id: crypto.randomUUID(),
      exercise_type: exerciseType,
      name: newExerciseName,
      weight_measure: unitsOfWeight,
      current_weight: currentWeight,
      target_weight: targetWeight,
    };

    console.log(newExercise);

    setNewExerciseName("");
    setCurrentWeight(0);
    setTargetWeight(0);
  };

  return (
    <form
      className="add-exercise-modal w-full flex column"
      style={{ gap: "10px" }}
      onSubmit={onFormSubmit}
    >
      <div className="w-full flex column" style={{ gap: "5px" }}>
        <label htmlFor="exerciseName">Nombre del ejercicio</label>
        <input
          type="text"
          id="exerciseName"
          placeholder="Ej: Remo con barra"
          value={newExerciseName}
          onChange={(e) => setNewExerciseName(e.target.value)}
          required
        />
      </div>
      <div className="w-full flex column" style={{ gap: "5px" }}>
        <label>Tipo de ejercicio</label>
        <div className="w-full flex centered" style={{ gap: "5px" }}>
          <div className="w-full flex column" style={{ gap: "5px" }}>
            <input
              name="typeOf"
              type="radio"
              id="exerciseTypeMachine"
              value="MACHINE"
              onChange={(e) => setExerciseType(e.target.value)}
              checked={exerciseType === "MACHINE"}
            />
            <label className="radio-label" htmlFor="exerciseTypeMachine">
              Maquina
            </label>
          </div>
          <div className="w-full flex column" style={{ gap: "5px" }}>
            <input
              name="typeOf"
              type="radio"
              id="exerciseTypeFree"
              value="FREE"
              onChange={(e) => setExerciseType(e.target.value)}
              checked={exerciseType === "FREE"}
            />
            <label className="radio-label" htmlFor="exerciseTypeFree">
              Libre
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex column" style={{ gap: "5px" }}>
        <label>Unidades de peso</label>
        <div className="w-full flex centered" style={{ gap: "5px" }}>
          <div className="w-full flex column" style={{ gap: "5px" }}>
            <input
              name="typeOfWeight"
              type="radio"
              id="exerciseWeightKG"
              value="KG"
              onChange={(e) => setUnitsOfWeight(e.target.value)}
              checked={unitsOfWeight === "KG"}
            />
            <label className="radio-label" htmlFor="exerciseWeightKG">
              Kilogramos (KG)
            </label>
          </div>
          <div className="w-full flex column" style={{ gap: "5px" }}>
            <input
              name="typeOfWeight"
              type="radio"
              id="exerciseWeightLBS"
              value="LBS"
              onChange={(e) => setUnitsOfWeight(e.target.value)}
              checked={unitsOfWeight === "LBS"}
            />
            <label className="radio-label" htmlFor="exerciseWeightLBS">
              Libras (LBS)
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex column" style={{ gap: "5px" }}>
        <label htmlFor="actualWeight">
          Peso actual que haces en el ejercicio
        </label>
        <input
          type="number"
          id="actualWeight"
          placeholder="Ej: 10"
          value={currentWeight}
          min={0}
          onChange={(e) => setCurrentWeight(Number(e.target.value))}
        />
      </div>
      <div className="w-full flex column" style={{ gap: "5px" }}>
        <label htmlFor="targetWeight">Objetivo a alcanzar en peso</label>
        <input
          type="number"
          id="targetWeight"
          placeholder="Ej: 90"
          value={targetWeight}
          min={0}
          onChange={(e) => setTargetWeight(Number(e.target.value))}
        />
      </div>
      <button type="submit" className="confirm-button">
        Crear ejercicio
      </button>
    </form>
  );
};

export default AddExerciseModal;
