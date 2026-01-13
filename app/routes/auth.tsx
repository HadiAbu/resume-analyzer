import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import type { Route } from "../+types/root";
import { useI18n } from "~/lib/i18n";
import { useAuthStore } from "../hooks/useAuthStore";
import axios from "axios";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "ResTrack | Auth" },
    { name: "description", content: "ResTrack Authentication Page" },
  ];
};

const Auth = () => {
  // New Auth Store hooks
  const { setAuth, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();

  // Form & UI State
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle "next" redirect path
  const params = new URLSearchParams(location.search);
  const rawNext = params.get("next") || "/";
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(next);
  //   }
  // }, [isAuthenticated, next, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        formData
      );

      if (isLogin) {
        // Response contains { token, user }
        setAuth(response.data.user, response.data.token);
      } else {
        // After register, switch to login
        setIsLogin(true);
        alert("Account created! Please log in.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[url('/images/bg-color.jpg')] bg-cover min-h-screen flex items-center justify-center p-4">
      <div className="gradient-border shadow-lg max-w-md w-full">
        <section className="flex flex-col gap-6 bg-white rounded-2xl p-10">
          <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-2xl font-bold">{t("auth.welcome")}</h1>
            <h2 className="text-gray-500">
              {isAuthenticated
                ? t("auth.loggedIn")
                : isLogin
                  ? t("auth.logInToContinue")
                  : "Create your account"}
            </h2>
          </div>

          {isAuthenticated ? (
            <div className="flex flex-col gap-4">
              <button
                className="auth-button w-full"
                onClick={() => navigate("/")}
              >
                {t("buttons.homepage")}
              </button>
              <button className="auth-button w-full bg-red-50" onClick={logout}>
                {t("buttons.logout")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {
                <>
                  <input
                    className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <input
                    className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                    type="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </>
              }

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`auth-button w-full ${loading ? "animate-pulse" : ""}`}
              >
                {loading
                  ? t("auth.signingIn")
                  : isLogin
                    ? t("buttons.login")
                    : "Register"}
              </button>

              <button
                type="button"
                className="text-blue-500 text-sm hover:underline"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
              >
                {isLogin
                  ? "Need an account? Register"
                  : "Have an account? Login"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

export default Auth;
