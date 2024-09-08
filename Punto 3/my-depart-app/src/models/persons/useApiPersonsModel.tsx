import { IPerson } from "../../interfaces/IPerson";

const ENDPOINT = "http://127.0.0.1/api/person";

export const useApiPersonsModel = () => {
  const getPersonsFromAPI = async (): Promise<IPerson[] | null> => {
    try {
      const response = await fetch(`${ENDPOINT}/getAll.php`);
      const persons = await response.json();

      return persons as IPerson[];
    } catch (err) {
      console.error("[ERROR] - Can't get persons from API! ", err);
      return null;
    }
  };

  const getPersonFromAPI = async (id: number): Promise<IPerson | null> => {
    try {
      const response = await fetch(`${ENDPOINT}/get.php?id=${id}`);
      const persons = await response.json();

      return persons as IPerson;
    } catch (err) {
      console.error("[ERROR] - Can't get persons from API! ", err);
      return null;
    }
  };

  const createPersonsInAPI = async (
    name: string,
    departmentId: number | null
  ): Promise<void> => {
    try {
      console.log(name, departmentId);
      await fetch(
        `${ENDPOINT}/create.php?name=${name}&departmentId=${departmentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/html; charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.error("[ERROR] - Can't create persons into API!: ", error);
      throw error;
    }
  };

  const updatePersonInAPI = async (
    id: number,
    newName: string,
    newDepartmentId: number | null
  ): Promise<void> => {
    try {
      await fetch(
        `${ENDPOINT}/update.php?id=${id}&name=${newName}&departmentId=${newDepartmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "text/html; charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.error("[ERROR] - Can't update persons into API!: ", error);
      throw error;
    }
  };

  const deletePersonInAPI = async (id: number): Promise<void> => {
    try {
      await fetch(`${ENDPOINT}/delete.php?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
        },
      });
    } catch (error) {
      console.error("[ERROR] - Can't update persons into API!: ", error);
      throw error;
    }
  };

  return {
    getPersonsFromAPI,
    getPersonFromAPI,
    createPersonsInAPI,
    updatePersonInAPI,
    deletePersonInAPI,
  };
};
