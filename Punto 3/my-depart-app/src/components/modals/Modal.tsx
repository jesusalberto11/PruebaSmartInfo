import "../../styles/modals/Modal.css";
import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import SimpleButton from "../shared/buttons/SimpleButton";
import { SVG_ICONS } from "../../helpers/svgIcons";

const Modal = forwardRef(
  (props: { children: ReactNode; title: string }, ref) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useImperativeHandle(ref, () => ({
      openModal,
      closeModal,
    }));

    const openModal = () => modalRef.current?.showModal();
    const closeModal = () => modalRef.current?.close();

    return (
      <dialog ref={modalRef} className="simple-dialog">
        <div
          className="w-full flex align-center justify-between"
          style={{ gap: "15px" }}
        >
          <p className="modal-title">{props.title}</p>
          <SimpleButton
            showTitle={false}
            title="Cerrar"
            icon={SVG_ICONS.CLOSE}
            onClickItem={closeModal}
          />
        </div>
        <hr />
        {props.children}
      </dialog>
    );
  }
);

export default Modal;
