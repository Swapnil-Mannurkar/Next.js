import StartingPageContent from "../components/starting-page/starting-page";
import { getSession } from "next-auth/react";

function HomePage() {
  return <StartingPageContent />;
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
export default HomePage;
