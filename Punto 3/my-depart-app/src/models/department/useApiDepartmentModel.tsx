import { IDepartment } from "../../interfaces/IDepartment";

const ENDPOINT = "http://127.0.0.1/api/department";

export const useApiDepartmentModel = () => {
  const getDepartmentsFromAPI = async (): Promise<IDepartment[] | null> => {
    try {
      const response = await fetch(`${ENDPOINT}/getAll.php`);
      const departments = await response.json();

      return departments as IDepartment[];
    } catch (err) {
      console.error("[ERROR] - Can't get departments from API! ", err);
      return null;
    }
  };

  const getDepartmentFromAPI = async (
    id: number
  ): Promise<IDepartment | null> => {
    try {
      const response = await fetch(`${ENDPOINT}/get.php?id=${id}`);
      const persons = await response.json();

      return persons as IDepartment;
    } catch (err) {
      console.error("[ERROR] - Can't get persons from API! ", err);
      return null;
    }
  };

  const createDepartmentInAPI = async (
    newDepartment: string
  ): Promise<void> => {
    try {
      await fetch(`${ENDPOINT}/create.php?name=${newDepartment}`, {
        method: "POST",
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
        },
      });
    } catch (error) {
      console.error("[ERROR] - Can't create department into API!: ", error);
      throw error;
    }
  };

  const updateDepartmentInAPI = async (
    id: number,
    name: string
  ): Promise<void> => {
    try {
      await fetch(
        `http://127.0.0.1/api/department/update.php?id=${id}&name=${name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "text/html; charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.error("[ERROR] - Can't update department into API!: ", error);
      throw error;
    }
  };

  const deleteDepartmentInAPI = async (id: number): Promise<void> => {
    try {
      await fetch(`http://127.0.0.1/api/department/delete.php?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
        },
      });
    } catch (error) {
      console.error("[ERROR] - Can't update department into API!: ", error);
      throw error;
    }
  };

  return {
    getDepartmentsFromAPI,
    getDepartmentFromAPI,
    createDepartmentInAPI,
    updateDepartmentInAPI,
    deleteDepartmentInAPI,
  };
};
