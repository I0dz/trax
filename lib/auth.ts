import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "./prisma";

require("dotenv").config();

type Handler = (req: NextApiRequest, res: NextApiResponse, user: any) => any;

export function validateRoute(handler: Handler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      let user;
      // @ts-ignore
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      try {
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw Error("Error when retrieving the user.");
        }
      } catch (e) {
        res.status(401);
        res.json("Unhautorized user");
        return;
      }
      return handler(req, res, user);
    }

    res.status(401);
    res.json("Unhautorized user");
  };
}
