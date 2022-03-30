import { NextApiRequest } from "next";

import GradientLayout from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default function playlist({ playlist }) {
  return (
    <GradientLayout
      color={getBackgroudColor(playlist.id)}
      title={playlist.name}
      description={`${playlist.songs.length} songs`}
      subtitle="playlist"
      roundImage={false}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
}

export async function getServerSideProps({
  query,
  req,
}: {
  query: { id: string };
  req: NextApiRequest;
}) {
  try {
    var user: any = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: Number(query.id),
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      playlist,
    },
  };
}

const colors = ["green", "blue", "yellow", "orange", "red", "purple", "teal"];

function getBackgroudColor(id: number) {
  return colors[(id - 1) % colors.length];
}
