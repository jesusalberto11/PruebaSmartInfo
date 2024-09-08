import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { useDepartment } from "../hooks/useDepartment";
import ConfirmDialog from "../components/modals/ConfirmDialog";

const AddDepartmentPage = () => {
  const navigate = useNavigate();

  const confirmModalRef = useRef<any>(null);

  const { id } = useParams();
  const {
    createDepartment,
    getDepartment,
    updateDepartment,
    deleteDepartment,
  } = useDepartment();

  const [newName, setNewName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    id ? setIsEditing(true) : setIsEditing(false);
  }, []);

  useEffect(() => {
    if (!id) return;

    getDepartment(Number(id)).then((response) => {
      if (response) {
        setNewName(response.name);
      }
    });
  }, [isEditing]);

  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    if (newName.length === 0) return;

    if (isEditing) {
      if (!id) return;

      await updateDepartment(Number(id), newName).then(() => {
        setNewName("");
        navigate("/departments");
      });

      return;
    }

    await createDepartment(newName).then(() => {
      setNewName("");
      navigate("/departments");
    });
  };

  const handleDelete = async () => {
    if (!id) return;

    await deleteDepartment(Number(id)).then(() => {
      setNewName("");
      navigate("/departments");
    });
  };

  return (
    <PageLayout
      gap={20}
      padding={15}
      firstTitle={isEditing ? "Editar " : "Crear "}
      secondTitle="departamento"
      showBackButton={true}
    >
      <form
        className="w-full flex column"
        style={{ gap: "20px" }}
        onSubmit={onFormSubmit}
      >
        <div className="w-full flex column" style={{ gap: "10px" }}>
          <label className="font-bold" htmlFor="newDepartment">
            Nombre del departamento
          </label>
          <input
            type="text"
            id="newDepartment"
            placeholder="Ej: Atlántico, Bolivar, Caldas..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="confirm-button">
          {isEditing ? "Guardar cambios" : "Crear persona"}
        </button>
      </form>
      {isEditing && (
        <button
          className="delete-button"
          onClick={() => confirmModalRef?.current?.openDialog()}
        >
          Eliminar
        </button>
      )}
      <ConfirmDialog
        ref={confirmModalRef}
        title="¿Deseas eliminar este departamento?"
        action={handleDelete}
      />
    </PageLayout>
  );
};

export default AddDepartmentPage;
