import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";

import AddDepartmentPage from "../pages/AddDepartmentPage";
import DepartmentsPage from "../pages/DepartmentsPage";
import PersonsPage from "../pages/PersonsPage";
import AddPersonsPage from "../pages/AddPersonsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <DepartmentsPage />,
          },
          {
            path: "departments",
            element: <DepartmentsPage />,
          },
          {
            path: "add-department",
            element: <AddDepartmentPage />,
          },
          {
            path: "add-department/:id",
            element: <AddDepartmentPage />,
          },
          {
            path: "persons",
            element: <PersonsPage />,
          },
          {
            path: "add-person",
            element: <AddPersonsPage />,
          },
          {
            path: "add-person/:id",
            element: <AddPersonsPage />,
          },
        ],
      },
    ],
  },
]);
