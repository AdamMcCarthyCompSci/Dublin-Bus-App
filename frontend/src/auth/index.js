import { createAuthProvider } from "react-token-auth";

export const [useAuth, authFetch, login, logout] = createAuthProvider({
  accessTokenKey: "access",
  onUpdateToken: (token) =>
    fetch("http://localhost:8000/api/token/refresh", {
      method: "POST",
      body: token.access,
    }).then((r) => r.json()),
});