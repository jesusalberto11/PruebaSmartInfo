import "../../../styles/shared/buttons/FAB.css";

const FAB = (props: { title: string; onClick: Function }) => {
  return (
    <div className="floating-action-button-container">
      <button
        className="floating-button"
        type="button"
        aria-label="Floating Action Button"
        title={props.title}
        onClick={() => props.onClick()}
      >
        <p className="floating-button-text">+</p>
      </button>
    </div>
  );
};

export default FAB;
