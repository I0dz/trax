import fetcher from "./fetcher";

export function auth(
  mode: "signup" | "signin",
  body: { email: string; password: string }
) {
  return fetcher(`/${mode}`, body);
}
