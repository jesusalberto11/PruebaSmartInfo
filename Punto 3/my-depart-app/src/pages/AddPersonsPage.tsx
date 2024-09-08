import "../styles/pages/SetPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import SearchInput from "../components/shared/data-entry/SearchInput";
import LoaderSpinner from "../components/shared/ui/LoaderSpinner";
import ConfirmDialog from "../components/modals/ConfirmDialog";
import { IDepartment } from "../interfaces/IDepartment";
import { usePersons } from "../hooks/usePersons";
import { useDepartment } from "../hooks/useDepartment";

const AddPersonsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const confirmModalRef = useRef<any>(null);

  const { createPerson, getPerson, updatePerson, deletePerson } = usePersons();
  const { getDepartments } = useDepartment();

  const [newName, setNewName] = useState<string>("");
  const [newPersonDepartment, setNewPersonDepartments] = useState<
    number | null
  >(null);

  const [departments, setDepartments] = useState<IDepartment[] | null>(null);
  const [filteredDepartments, setFilteredDepartments] = useState<
    IDepartment[] | null
  >(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    id ? setIsEditing(true) : setIsEditing(false);
  }, []);

  useEffect(() => {
    getDepartments().then((response) => {
      if (response) {
        setDepartments(response);
        setFilteredDepartments(response);
      }
    });
  }, []);

  useEffect(() => {
    if (!id) return;

    getPerson(Number(id)).then((response) => {
      if (response) {
        setNewName(response.name);
        setNewPersonDepartments(response?.department_id);
      }
    });
  }, [isEditing]);

  const addDepartmentToPerson = (selection: number | null) => {
    selection
      ? setNewPersonDepartments(selection)
      : setNewPersonDepartments(null);
  };

  const handleDelete = async () => {
    if (!id) return;

    await deletePerson(Number(id)).then(() => {
      setNewName("");
      setNewPersonDepartments(null);
      navigate("/persons");
    });
  };

  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    if (newName.length === 0) return;

    if (isEditing) {
      if (!id) return;

      await updatePerson(Number(id), newName, newPersonDepartment).then(() => {
        setNewName("");
        setNewPersonDepartments(null);
        navigate("/persons");
      });

      return;
    }

    await createPerson(newName, newPersonDepartment).then(() => {
      setNewName("");
      setNewPersonDepartments(null);
      navigate("/persons");
    });
  };

  return (
    <PageLayout
      gap={20}
      padding={15}
      firstTitle={isEditing ? "Editar " : "Crear "}
      secondTitle="persona"
      showBackButton={true}
      backTo="/persons"
    >
      <form
        className="w-full flex column"
        style={{ gap: "20px" }}
        onSubmit={onFormSubmit}
      >
        <div className="w-full flex column" style={{ gap: "10px" }}>
          <label className="font-bold" htmlFor="newPerson">
            Nombre de la persona
          </label>
          <input
            type="text"
            id="newPerson"
            placeholder="Ej: Jesus..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex column" style={{ gap: "10px" }}>
          <label className="font-bold">Departamento al que pertenece</label>
          <SearchInput
            placeholder="Buscar departamento"
            list={departments}
            setList={setFilteredDepartments}
          />
          <div
            className="new-set-exercises-list h-full w-full flex column"
            style={{ gap: "5px" }}
          >
            <>
              {filteredDepartments ? (
                filteredDepartments.length === 0 ? (
                  <p>No hay departamentos</p>
                ) : (
                  filteredDepartments.map((department: IDepartment) => (
                    <div
                      key={department.id}
                      className="w-full flex column"
                      style={{ gap: "5px" }}
                    >
                      <input
                        type="radio"
                        id={department?.id.toString()}
                        name="newSelectedDepartment"
                        onChange={() => addDepartmentToPerson(department.id)}
                        checked={newPersonDepartment === department.id}
                        required
                      />
                      <label
                        className="radio-label"
                        key={department.id}
                        htmlFor={department?.id.toString()}
                      >
                        {department.name}
                      </label>
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
        title="¿Realmente deseas eliminar esta persona?"
        action={handleDelete}
      />
    </PageLayout>
  );
};

export default AddPersonsPage;
