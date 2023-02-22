// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";

export default function Dashboard({ data }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.map((profile: any) => (
          <li key={profile.id}>{profile.name}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const prisma = new PrismaClient();
  const data = await prisma.profiles.findMany();
  console.log(data);

  return {
    props: {
      data,
    },
  };
};
