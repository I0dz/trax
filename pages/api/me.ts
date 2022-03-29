import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(async (req, res, user) => {
  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });
  const me = { ...user, playlistsCount };
  delete me.password;
  res.json(me);
});
