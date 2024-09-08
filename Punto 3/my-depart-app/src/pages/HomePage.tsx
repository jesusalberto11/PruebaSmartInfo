import PageLayout from "../components/layout/PageLayout";

const HomePage = () => {
  return (
    <PageLayout
      gap={20}
      padding={15}
      firstTitle="Hola, "
      secondTitle="Invitado"
    >
      <h1>Home</h1>
    </PageLayout>
  );
};

export default HomePage;
