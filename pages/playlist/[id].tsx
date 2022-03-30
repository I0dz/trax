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
      description={`${playlist.songs.lenght} songs`}
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
  query: any;
  req: NextApiRequest;
}) {
  //@ts-ignore
  const { id } = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: Number(query.id),
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
