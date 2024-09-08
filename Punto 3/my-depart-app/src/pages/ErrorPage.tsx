import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import "../styles/pages/ErrorPage.css";

const ErrorPage = () => {
  return (
    <PageLayout gap={10} padding={10}>
      <div
        className="error-page h-full w-full flex column align-start justify-center"
        style={{ gap: "20px" }}
      >
        <h1>Oops!</h1>
        <h2>Error 401</h2>
        <p>¡La pagina a la que intentas acceder no existe!</p>
        <Link to={"/"}>Regresar a la pagina de inicio</Link>
      </div>
    </PageLayout>
  );
};

export default ErrorPage;
