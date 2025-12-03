import { usePuterStore } from "~/lib/puter";
import type { Route } from "../+types/root";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "ResTrack | Auth" },
    { name: "description", content: "ResTrack Authentication Page" },
  ];
};

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  //   const next = location.search.split("next=")[1] || "/";
  const params = new URLSearchParams(location.search); // Validate that next is a relative path (starts with /) and doesn't contain protocol
  const rawNext = params.get("next") || "/";
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-color.jpg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col gap-2 items-center text-center ">
            <h1>Welcome</h1>
            {auth.isAuthenticated ? (
              <h2>You are successfully logged in</h2>
            ) : (
              <h2>Login to continue your job hunt!</h2>
            )}
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in..</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <div className="flex flex-col gap-4 items-center">
                    <button
                      className="auth-button"
                      onClick={() => navigate(next)}
                    >
                      <p>Go to Homepage</p>
                    </button>
                    <button className="auth-button" onClick={auth.signOut}>
                      <p>Log out</p>
                    </button>
                  </div>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Login</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
