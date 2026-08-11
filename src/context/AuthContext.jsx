import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

async function request(url, options = {}) {
  const response = await fetch(`/api/auth${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function restoreSession() {
      try {
        const data = await request("/me");
        setUser(data.user);
      } catch {
        setUser(null);
      }
    }

    restoreSession();
  }, []);

  async function login(email, password) {
    const data = await request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setUser(data.user);
  }

  async function register(name, email, password) {
    const data = await request("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    setUser(data.user);
  }

  async function logout() {
    await request("/logout", { method: "POST" });
    setUser(null);
  }

  async function updateProfile(name, email) {
    const data = await request("/update-profile", {
      method: "PUT",
      body: JSON.stringify({ name, email }),
    });

    setUser(data.user);
  }

  async function changePassword(currentPassword, newPassword) {
    await request("/change-password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}