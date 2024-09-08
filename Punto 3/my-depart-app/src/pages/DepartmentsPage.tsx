import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DepartmentsList from "../components/pages/DepartmentsPage/DepartmentsList";
import FAB from "../components/shared/buttons/FAB";
import LoaderSpinner from "../components/shared/ui/LoaderSpinner";
import PageLayout from "../components/layout/PageLayout";
import SearchInput from "../components/shared/data-entry/SearchInput";
import { useDepartment } from "../hooks/useDepartment";
import { IDepartment } from "../interfaces/IDepartment";

const DepartmentsPage = () => {
  const navigate = useNavigate();
  const { getDepartments } = useDepartment();

  const [departments, setDepartments] = useState<IDepartment[] | null>(null);
  const [filteredDepartments, setFilteredDepartments] = useState<
    IDepartment[] | null
  >(null);

  useEffect(() => {
    getDepartments().then((response) => {
      if (response) {
        setDepartments(response);
        setFilteredDepartments(response);
      }
    });
  }, []);

  return (
    <PageLayout
      gap={20}
      padding={15}
      firstTitle="Tus "
      secondTitle="departamentos"
    >
      <SearchInput
        placeholder="Buscar departamento"
        list={departments}
        setList={setFilteredDepartments}
      />
      <>
        {filteredDepartments ? (
          filteredDepartments.length === 0 ? (
            <p>No hay departamentos!</p>
          ) : (
            <DepartmentsList items={filteredDepartments} />
          )
        ) : (
          <div className="w-full h-full flex centered">
            <LoaderSpinner />
          </div>
        )}
      </>
      <FAB
        title="Crear nuevo departamento"
        onClick={() => navigate("/add-department")}
      />
    </PageLayout>
  );
};

export default DepartmentsPage;
