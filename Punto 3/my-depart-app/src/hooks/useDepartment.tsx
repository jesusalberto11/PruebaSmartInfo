import { useApiDepartmentModel } from "../models/department/useApiDepartmentModel";

export const useDepartment = () => {
  const {
    getDepartmentsFromAPI,
    getDepartmentFromAPI,
    createDepartmentInAPI,
    updateDepartmentInAPI,
    deleteDepartmentInAPI,
  } = useApiDepartmentModel();

  return {
    getDepartments: getDepartmentsFromAPI,
    getDepartment: getDepartmentFromAPI,
    createDepartment: createDepartmentInAPI,
    updateDepartment: updateDepartmentInAPI,
    deleteDepartment: deleteDepartmentInAPI,
  };
};
