import { useEffect, useState } from "react";
import FAB from "../components/shared/buttons/FAB";
import LoaderSpinner from "../components/shared/ui/LoaderSpinner";
import PageLayout from "../components/layout/PageLayout";
import SearchInput from "../components/shared/data-entry/SearchInput";
import { useNavigate } from "react-router-dom";
import { usePersons } from "../hooks/usePersons";
import { IPerson } from "../interfaces/IPerson";

const PersonsPage = () => {
  const navigate = useNavigate();
  const { getPersons } = usePersons();

  const [persons, setPersons] = useState<IPerson[] | null>(null);
  const [filteredPersons, setFilteredPersons] = useState<IPerson[] | null>(
    null
  );

  useEffect(() => {
    getPersons().then((response) => {
      if (response) {
        setPersons(response);
        setFilteredPersons(response);
      }
    });
  }, []);

  return (
    <PageLayout gap={20} padding={15} firstTitle="Tus " secondTitle="personas">
      <SearchInput
        placeholder="Buscar persona"
        list={persons}
        setList={setFilteredPersons}
      />
      {filteredPersons ? (
        filteredPersons.length === 0 ? (
          <p>No hay personas</p>
        ) : (
          <ol className="flex column flex-wrap" style={{ gap: "10px" }}>
            {filteredPersons.map((person: IPerson, index) => (
              <li
                key={index}
                className="box rounded-corners blue-box flex row align-center justify-start"
                style={{ gap: "5px", flexWrap: "wrap" }}
                onClick={() => navigate(`/add-person/${person.id}`)}
              >
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {person.name}
                </p>
                {person.department_name ? (
                  <p className="flex row" style={{ gap: "5px" }}>
                    Pertenece al departamento
                    <span style={{ fontWeight: "bold" }}>
                      {person.department_name}
                    </span>
                  </p>
                ) : (
                  <p>No tiene departamento</p>
                )}
              </li>
            ))}
          </ol>
        )
      ) : (
        <div className="w-full h-full flex centered">
          <LoaderSpinner />
        </div>
      )}
      <FAB
        title="Crear nueva Persona"
        onClick={() => navigate("/add-person")}
      />
    </PageLayout>
  );
};

export default PersonsPage;
