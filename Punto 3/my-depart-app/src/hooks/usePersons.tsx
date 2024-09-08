import { useApiPersonsModel } from "../models/persons/useApiPersonsModel";

export const usePersons = () => {
  const {
    getPersonsFromAPI,
    getPersonFromAPI,
    createPersonsInAPI,
    updatePersonInAPI,
    deletePersonInAPI,
  } = useApiPersonsModel();

  return {
    getPersons: getPersonsFromAPI,
    getPerson: getPersonFromAPI,
    createPerson: createPersonsInAPI,
    updatePerson: updatePersonInAPI,
    deletePerson: deletePersonInAPI,
  };
};
