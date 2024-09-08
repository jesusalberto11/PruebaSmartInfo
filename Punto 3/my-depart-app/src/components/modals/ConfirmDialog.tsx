import "../../styles/modals/ConfirmDialog.css";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import LoaderSpinner from "../shared/ui/LoaderSpinner";

const ConfirmDialog = forwardRef(
  (props: { title: string; action: Function }, ref) => {
    const confirmDialogRef = useRef<HTMLDialogElement | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      openDialog,
    }));

    const openDialog = () => confirmDialogRef.current?.showModal();

    const doAction = async () => {
      setIsLoading(true);

      await props.action().then(() => {
        confirmDialogRef.current?.close();
      });
    };

    return (
      <dialog ref={confirmDialogRef} className="simple-dialog">
        {isLoading ? (
          <div className="w-full flex centered">
            <LoaderSpinner />
          </div>
        ) : (
          <div className="w-full flex column centered" style={{ gap: "15px" }}>
            <p style={{ fontWeight: "bold" }}>
              {props.title
                ? props.title
                : "Realmente deseas borrar este elemento?"}
            </p>
            <div className="flex centered" style={{ gap: "20px" }}>
              <button
                className="confirm-dialog-btn rounded-corners"
                onClick={() => doAction()}
              >
                Sí, eliminar
              </button>
              <button
                className="confirm-dialog-btn rounded-corners"
                onClick={() => confirmDialogRef.current?.close()}
              >
                No
              </button>
            </div>
          </div>
        )}
      </dialog>
    );
  }
);

export default ConfirmDialog;
