import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  if (signedInPages.find(page => page === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      // We must provide absolute path according to the latest Next.js API
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
