"use client";

import api from "@/service/api";
// import api from "@/services/api";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  setUser: any;
};

type SignInData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  sobrenome: string;
  saldo: string;
  email: string;
  address: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const cookies = parseCookies();
  const cdfToken = cookies.cdf_token;
  const isAuthenticated = !!user;

  useEffect(() => {
    if (cdfToken) {
      api
        .get("/me", {
          headers: { Authorization: `Bearer ${cdfToken}` },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, [cdfToken]);

  async function signIn({ email, password }: SignInData) {
    api
      .post("/login", { email, password })
      .then((response) => {
        const { access_token } = response.data;
        setCookie(undefined, "cdf_token", access_token, {
          maxAge: 30 * 24 * 60 * 60,
        });
        api.defaults.headers["Authorization"] = `Bearer ${cdfToken}`;
        api
          .get("/me", {
            headers: { Authorization: `Bearer ${cdfToken}` },
          })
          .then((response) => {
            setUser(response.data);
            router.push("/dashboard");
          });
      })
      .catch((error) => {
        console.log(error.response);
        // toast.error(error.response.data.);
      });
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    } else {
      router.replace("/signin");
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, setUser }}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
}
