import { useRef } from "react";
import Modal from "../../modals/Modal";
import TrainExerciseModal from "./TrainExerciseModal";

const TrainExercise = () => {
  const trainExerciseRef = useRef<any>(null);

  return (
    <>
      <div
        className="box blue-box w-full rounded-corners flex column centered"
        style={{ height: "100px", gap: "5px" }}
        onClick={() => trainExerciseRef.current?.openModal()}
      >
        <p className="min-with-fit-content font-bold">Entrenar ejercicio</p>
      </div>
      <Modal ref={trainExerciseRef} title="Entrenar ejercicio">
        <TrainExerciseModal />
      </Modal>
    </>
  );
};

export default TrainExercise;
